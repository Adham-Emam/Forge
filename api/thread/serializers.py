from rest_framework import serializers
from .models import Thread, Message
from django.contrib.auth import get_user_model


User = get_user_model()


class ThreadSerializer(serializers.ModelSerializer):
    user1 = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="email"
    )
    user2 = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="email"
    )
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = ["id", "user1", "user2", "project", "created_at", "last_message"]

    def get_last_message(self, obj):
        last_message = obj.messages.first()
        if last_message:
            return {
                "text": last_message.text,
                "created_at": last_message.created_at,
                "sender": last_message.sender.email,
            }

        return None


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="email"
    )
    thread = ThreadSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ["id", "thread", "sender", "text", "is_read", "created_at"]


class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["thread", "text"]

    def validate(self, data):
        # Ensure the sender is part of the thread
        user = self.context["request"].user
        thread = data.get("thread")

        if user.email != thread.user1.email and user.email != thread.user2.email:
            raise serializers.ValidationError("You are not part of this thread.")

        return data
