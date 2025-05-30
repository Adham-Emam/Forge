from django.urls import path

from . import views

urlpatterns = [
    path("", views.BadgeListView.as_view(), name="badge-list"),
    path("create/", views.BadgeCreateView.as_view(), name="badge-create"),
    path("<pk>/", views.BadgeDetailView.as_view(), name="badge-detail"),
]
