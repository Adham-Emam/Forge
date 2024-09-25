from django.urls import path
from .views import ProjectListCreateView, ProjectDetailView, UserProjectsList, UserProjectMatchesList, UserSavedProjectsList, ToggleSavedProject, SearchProjects, BidListCreateView

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='project-list-create'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('user/<int:user_id>/', UserProjectsList.as_view(), name='user-projects'),
    path('user/<int:user_id>/matches/', UserProjectMatchesList.as_view(), name='user-project-matches'),
    path('user/<int:user_id>/saved/', UserSavedProjectsList.as_view(), name='user-saved-projects'),
    path('user/save_project/<int:project_id>/', ToggleSavedProject.as_view(), name='toggle-saved-project'),
    path('search/', SearchProjects.as_view(), name='search-projects'),
    path('<int:project_id>/bids/', BidListCreateView.as_view(), name='project-bids'),
]

