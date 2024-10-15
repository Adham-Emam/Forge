from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from .models import CustomUser, Notification, Transaction, Subscriber
from .serializers import CreateUserSerializer, CustomUserSerializer, NotificationSerializer, TransactionSerializer, SubscriberSerializer


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]


    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        notification = Notification.objects.create(
            user=user,
            type="welcome",
            url=f"/dashboard/profile/{user.id}?username={user.first_name}+{user.last_name}&title={user.user_title}",
            message="Welcome to Forge! Get started by creating a project.",
        )
        notification.save()

        email = self.request.data['email']
        subscriber = Subscriber.objects.create(email=email)
        subscriber.save()

        return Response({
            "user": CustomUserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        }, status=status.HTTP_201_CREATED)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CurrentUserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def retrieve(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    def update(self, request):
        user = request.user
        serializer = CustomUserSerializer(
            user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class NotificationsList(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user.id
        return Notification.objects.filter(user=user, is_read=False)
    
class MarkNotificationAsRead(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user.id
        return Notification.objects.filter(user=user, is_read=False)
    

class TransactionList(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user.id
        transaction_type = self.request.query_params.get('type', None)

        if transaction_type == "received":
            return Transaction.objects.filter(user=user, type="received")
        elif transaction_type == "payment":
            return Transaction.objects.filter(user=user , type="payment")
        else :
            return Transaction.objects.filter(user=user)


class SubscribersListView(generics.ListCreateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    authentication_classes = []
    permission_classes = [AllowAny]


class UnSubscriberView(generics.DestroyAPIView):
    serializer_class = SubscriberSerializer
    permission_classes = [AllowAny]