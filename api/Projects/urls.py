from django.urls import path
from .views import ProjectListCreateView, ProjectDetailView, UserProjectsList, UserProjectMatchesList, UserSavedProjectsList, ToggleSavedProject, BidListCreateView, UsersBidsList, RequestProjectApproval, ApproveProject

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='project-list-create'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('<int:project_id>/request_approval/<int:bidder_id>/', RequestProjectApproval.as_view(), 
        name='request-approval'),
    path('<int:project_id>/approve/', ApproveProject.as_view(), name='approve-project'),
    path('user/', UserProjectsList.as_view(), name='user-projects'),
    path('user/<int:user_id>/matches/', UserProjectMatchesList.as_view(), name='user-project-matches'),
    path('user/<int:user_id>/saved/', UserSavedProjectsList.as_view(), name='user-saved-projects'),
    path('user/save_project/<int:project_id>/', ToggleSavedProject.as_view(), name='toggle-saved-project'),
    path('<int:project_id>/bids/', BidListCreateView.as_view(), name='project-bids'),
    path('user/bids/', UsersBidsList.as_view(), name='user-bids-list'),
]