from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Thread, Message
from .serializers import ThreadSerializer, MessageSerializer, CreateMessageSerializer


class ThreadListView(generics.ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Thread.objects.filter(user1=user) | Thread.objects.filter(user2=user)


class ThreadDetailView(generics.RetrieveAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Thread.objects.filter(user1=user) | Thread.objects.filter(user2=user)


class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        thread_id = self.kwargs["thread_id"]

        return Message.objects.filter(id=thread_id)


class CreateMessageView(generics.CreateAPIView):
    serializer_class = CreateMessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializers):
        thread = serializers.validated_data["thread"]
        user = self.request.user

        # Only allow users part of the thread to send a message
        if user.email != thread.user1.email and user.email != thread.user2.email:
            raise serializers.ValidationError("You are not part of this thread.")

        serializers.save(sender=user)
