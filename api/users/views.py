from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


from .serializers import (
    CustomTokenObtainPairSerializer,
    CustomUserSerializer,
    CustomUserRegisterSerializer,
    BadgeSerializer,
)
from .models import CustomUser, Badge
from .permissions import IsAdminOrSelf
from .token import CustomAccessToken


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data)


class UserRegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserRegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Create JWT tokens manually
        refresh = RefreshToken.for_user(user)

        access = CustomAccessToken.for_user(user)

        # Return both user data and tokens
        data = {
            "user": CustomUserSerializer(
                user, context=self.get_serializer_context()
            ).data,
            "refresh": str(refresh),
            "access": str(access),
        }

        return Response(data, status=status.HTTP_201_CREATED)


class UserListView(generics.ListAPIView):
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAdminUser]
    filterset_fields = ["country", "city"]
    search_fields = ["first_name", "last_name", "email", "title"]
    ordering_fields = ["date_joined", "hourly_rate"]


class UserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class UserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]
