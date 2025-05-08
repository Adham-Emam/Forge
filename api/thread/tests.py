from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Thread, Message


User = get_user_model()


class MessagingTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user1 = User.objects.create_user(
            email="user1@example.com",
            password="password1",
            first_name="John",
            last_name="Doe",
        )
        self.user2 = User.objects.create_user(
            email="user2@example.com",
            password="password2",
            first_name="Jane",
            last_name="Smith",
        )

        self.thread = Thread.objects.create(user1=self.user1, user2=self.user2)
        self.message = Message.objects.create(
            thread=self.thread, sender=self.user1, text="Hello there!"
        )

    def authenticate(self, user):
        self.client.force_authenticate(user=user)

    def test_get_thread(self):
        self.authenticate(self.user1)
        url = reverse("thread-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_thread_detail(self):
        self.authenticate(self.user1)
        url = reverse("thread-detail", args=[self.thread.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user1"], self.user1.email)

    def test_get_messages(self):
        self.authenticate(self.user1)
        url = reverse("message-list", args=[self.thread.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["text"], "Hello there!")

    def test_send_message(self):
        self.authenticate(self.user2)
        url = reverse("message-create", args=[self.thread.id])
        data = {"thread": self.thread.id, "text": "Hi, user1!"}
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Message.objects.count(), 2)
        self.assertEqual(Message.objects.first().text, "Hi, user1!")
