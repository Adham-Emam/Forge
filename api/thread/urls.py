from django.urls import path
from . import views


urlpatterns = [
    path("", views.ThreadListView.as_view(), name="thread-list"),
    path("<int:pk>/", views.ThreadDetailView.as_view(), name="thread-detail"),
    path(
        "<int:thread_id>/messages/",
        views.MessageListView.as_view(),
        name="message-list",
    ),
    path(
        "<int:thread_id>/messages/create/",
        views.CreateMessageView.as_view(),
        name="message-create",
    ),
]
