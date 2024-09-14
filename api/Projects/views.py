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
