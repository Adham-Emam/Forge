from rest_framework.response import Response
from rest_framework import generics
from .models import Project
from Users.models import CustomUser
from .serializers import ProjectSerializer
from rest_framework.permissions import  IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404


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
        projects = Project.objects.all()

        saved_projects_ids = [project_id for project_id in user.saved_projects if project_id in projects.values_list('id', flat=True)]

        return Project.objects.filter(id__in=saved_projects_ids)

class ToggleSavedProject(generics.UpdateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProjectSerializer

    def update(self, request, *args, **kwargs):
        user_id = self.kwargs['user_id']
        project_id = self.kwargs['project_id']

        user = get_object_or_404(CustomUser, id=user_id)

        if project_id in user.saved_projects:
            user.saved_projects.remove(project_id)
        else:
            user.saved_projects.append(project_id)

        user.save()

        return Response({'message': 'Project saved status updated'})