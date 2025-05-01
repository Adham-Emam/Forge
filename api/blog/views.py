from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework.exceptions import ValidationError
from random import sample


class PostsView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "slug"  # Use slug instead of PK


class RandomPostsView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        try:
            slug = self.request.query_params.get("slug", "")
            num = int(self.request.query_params.get("num", 4))

            if num <= 0:
                raise ValidationError("Number of posts must be positive")

            # Efficient random sampling using database
            queryset = Post.objects.exclude(slug=slug)
            count = queryset.count()

            if count == 0:
                return Post.objects.none()

            num = min(num, count)  # Ensure we don't ask for more than available
            random_indices = sample(range(count), num)

            # This approach gets random posts in two queries
            return [queryset.all()[i] for i in random_indices]

        except ValueError:
            raise ValidationError("Invalid parameter value")
        except Exception as e:
            raise ValidationError(str(e))


class CommentPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 100


class CommentView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    pagination_class = CommentPagination

    def get_queryset(self):
        id = self.request.query_params.get("id", "")
        post_comments = Comment.objects.filter(post=id)

        return post_comments
