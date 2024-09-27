from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from .models import Project, Bid
from Users.models import CustomUser, Notification, Transaction
from .serializers import ProjectSerializer, BidSerializer
from rest_framework.permissions import  IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.db import IntegrityError

class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def post(self, request):
        user = request.user
        title = request.data.get('title')
        description = request.data.get('description')
        skills_needed = request.data.get('skills_needed')
        duration = request.data.get('duration')
        budget = request.data.get('budget')
        bid_amount = request.data.get('bid_amount')
        type = request.data.get('type')
        exchange_for = request.data.get('exchange_for')
        experience_level = request.data.get('experience_level')

        if not title or not description or not skills_needed or not duration or not budget or not bid_amount or not type:
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if duration < 1 or duration > 365:
            return Response({'error': 'Duration must be between 1 and 365 days.'}, status=status.HTTP_400_BAD_REQUEST)
        elif budget <= 0:
            return Response({'error': 'Budget must be greater than 0.'}, status=status.HTTP_400_BAD_REQUEST)
        elif bid_amount <= 0:
            return Response({'error': 'Bid amount must be greater than 0.'}, status=status.HTTP_400_BAD_REQUEST)
        elif budget > user.credits:
            return Response({'error': 'Insufficient credits, Please purchase more Embers.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            project = Project.objects.create(
                title=title,
                description=description,
                skills_needed=skills_needed,
                duration=duration,
                budget=budget,
                bid_amount=bid_amount,
                type=type,
                exchange_for=exchange_for,
                experience_level=experience_level,
                owner=user
            )
            project.save()
            
            # Send notification to the project owner
            notification = Notification.objects.create(
                user=user,
                type='project',
                url= f'/dashboard/projects/{project.id}?title={project.title}&description={project.description}',
                message='Congratulations! Your project has been successfully created on our platform. Now, talented freelancers can discover it and submit their proposals. Keep an eye on your inbox for updates!'
            )
            notification.save()



            return Response(ProjectSerializer(project).data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'error': 'Project already exists.'}, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class UserProjectsList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(CustomUser, id=user_id)
        return Project.objects.filter(owner=user)

class UserProjectMatchesList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(CustomUser, id=user_id)
        projects = Project.objects.filter(status='open')

        project_ids = []
        for project in projects:
            if any(skills in user.skills for skills in project.skills_needed):
                project_ids.append(project.id)

        return Project.objects.filter(id__in=project_ids)


class UserSavedProjectsList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(CustomUser, id=user_id)
        return user.saved_projects.all()

class ToggleSavedProject(generics.GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProjectSerializer

    def post(self, request, *args, **kwargs):
        user_id = self.request.user.id
        project_id = self.kwargs.get('project_id')

        # Get the user and project objects
        user = get_object_or_404(CustomUser, id=user_id)
        project = get_object_or_404(Project, id=project_id)

        # Toggle saving/removing the project
        if project in user.saved_projects.all():
            user.saved_projects.remove(project)
            message = 'Project removed from saved projects'
        else:
            user.saved_projects.add(project)
            message = 'Project added to saved projects'

        return Response({'message': message}, status=status.HTTP_200_OK)

class SearchProjects(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProjectSerializer

    def get(self, request):
        query = request.GET.get('search')

        if query:
            projects = Project.objects.filter(
                Q(title__icontains=query) | Q(skills_needed__icontains=query)
            )
            serializer = self.serializer_class(projects, many=True)
            return Response(serializer.data)
        else :
            return Project.objects.none()


class BidListCreateView(generics.ListCreateAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return Bid.objects.filter(project=project_id)
    
    def post(self, request,  **kwargs):
        project_id = kwargs['project_id']
        project = get_object_or_404(Project, id=project_id)
        user = request.user
        proposal = request.data.get('proposal')
        amount = request.data.get('amount')
        duration = request.data.get('duration')
        
        if user == project.owner:
            return Response({'error': 'You cannot bid on your project'}, status=status.HTTP_403_FORBIDDEN)
        elif user.sparks < project.bid_amount:
            return Response({'error': 'You do not have enough sparks to bid on this project'}, status=status.HTTP_400_BAD_REQUEST)
        elif duration < 1 or duration > 365:
            return Response({'error': 'Duration must be between 1 and 365 days'}, status=status.HTTP_400_BAD_REQUEST)
        elif amount <= 0:
            return Response({'error': 'Amount must be greater than 0'}, status=status.HTTP_400_BAD_REQUEST)
        elif amount > project.budget:
            return Response({'error': 'Amount must be less than or equal to project budget'}, status=status.HTTP_400_BAD_REQUEST)
        elif duration <= 0:
            return Response({'error': 'Duration must be greater than 0'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            bid = Bid(project=project, user=user, proposal=proposal, amount=amount, duration=duration)
            bid.save()
            
            user.sparks -= project.bid_amount
            user.save()

            transaction = Transaction(
                user=user,
                currency='spark',
                description='Bid on project',
                amount=project.bid_amount,
            )
            transaction.save()

            # Send Notification to the project owner
            notification= Notification.objects.create(
            user=project.owner,
            type="bid",
            url=f"/dashboard/projects/{project.id}?title={project.title}&description={project.description}",
            message=f"{user.first_name} {user.last_name} has submitted a bid on your project."
            )
            notification.save()


        except IntegrityError:
            return Response({'error': 'You have already bid on this project'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Bid created successfully'})