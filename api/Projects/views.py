from rest_framework.response import Response
from rest_framework import generics
from .models import Project
from Users.models import CustomUser
from .serializers import ProjectSerializer
from rest_framework.permissions import  IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from django.db.models import Q


class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


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
        user_id = self.kwargs['user_id']
        project_id = self.kwargs['project_id']

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

        return Response({'message': message})


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

