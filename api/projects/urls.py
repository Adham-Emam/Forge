from django.urls import path
from . import views

urlpatterns = [
    path("", views.ProjectListView.as_view(), name="project-list"),
    path("<int:pk>/", views.ProjectDetailView.as_view(), name="project-detail"),
    path(
        "<int:pk>/update-destroy",
        views.ProjectUpdateDestroyView.as_view(),
        name="project-update-destroy",
    ),
    path("create/", views.ProjectCreateView.as_view(), name="project-create"),
    path(
        "<int:project_id>/proposals/",
        views.ProposalListView.as_view(),
        name="proposal-list",
    ),
    path(
        "<int:project_id>/proposals/<int:proposal_id>/",
        views.ProposalDetailView.as_view(),
        name="proposal-detail",
    ),
    path(
        "<int:project_id>/proposals/create/",
        views.ProposalCreateView.as_view(),
        name="proposal-create",
    ),
]
