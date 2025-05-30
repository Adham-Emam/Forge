from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from . import views

urlpatterns = [
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("register/", views.UserRegisterView.as_view(), name="user-register"),
    path("", views.UserListView.as_view(), name="user-list"),
    path("<int:pk>/update/", views.UserUpdateView.as_view(), name="user-update"),
    path("<int:pk>/", views.UserDetailView.as_view(), name="user-detail"),
    path("current/", views.CurrentUserView.as_view(), name="current-user"),
]
