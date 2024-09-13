from django.urls import path
from .views import ProjectListCreateView, ProjectDetailView, UserProjectsList

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='project-list-create'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('user/<int:user_id>/',
         UserProjectsList.as_view(), name='user-projects')
]
