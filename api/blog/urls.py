from django.urls import path
from .views import PostsView, PostDetailView, CommentView, RandomPostsView

urlpatterns = [
    path("posts/", PostsView.as_view(), name="posts-list"),
    path("random-posts/", RandomPostsView.as_view(), name="random-posts"),
    path("posts/<slug:slug>", PostDetailView.as_view(), name="post-detail"),
    path("comments/", CommentView.as_view(), name="comment_view"),
]
