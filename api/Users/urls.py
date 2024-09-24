from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CurrentUserViewSet, CreateUserView, UserViewSet, NotificationsList, MarkNotificationAsRead
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
      path('current-user/', CurrentUserViewSet.as_view({
        'get': 'retrieve',
        'patch': 'update',
        'delete': 'destroy'
    }), name='current-user'),
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('notifications/', NotificationsList.as_view(), name='user-notifications'),
    path('notifications/<int:pk>/', MarkNotificationAsRead.as_view(), name='notification-detail'),
    path('', include(router.urls)),
]
