from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from . import views

router = DefaultRouter()
router.register(r"educations", views.UserEducationViewSet, basename="education")
router.register(r"experiences", views.UserWorkExperienceViewSet, basename="experience")

urlpatterns = [
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("register/", views.UserRegisterView.as_view(), name="user-register"),
    path("", views.UserListView.as_view(), name="user-list"),
    path("<pk>/", views.UserDetailView.as_view(), name="user-detail"),
    path("<pk>/update/", views.UserUpdateView.as_view(), name="user-update"),
    path("", include(router.urls)),
]
