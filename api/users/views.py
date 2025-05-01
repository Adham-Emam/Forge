from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import (
    CustomTokenObtainPairSerializer,
    CustomUserSerializer,
    CustomUserRegisterSerializer,
    UserEducationSerializer,
    UserWorkExperienceSerializer,
)
from .models import CustomUser, UserEducation, UserWorkExperience
from .permissions import IsOwnerOrReadOnly, IsAdminOrSelf
from .token import CustomAccessToken


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


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
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAdminUser]
    filterset_fields = ["country", "city"]
    search_fields = ["first_name", "last_name", "email", "title"]
    ordering_fields = ["date_joined", "hourly_rate"]


class UserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]


class UserEducationViewSet(viewsets.ModelViewSet):
    serializer_class = UserEducationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return UserEducation.objects.all()
        return UserEducation.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserWorkExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = UserWorkExperienceSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return UserWorkExperience.objects.all()
        return UserWorkExperience.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
