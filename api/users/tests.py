from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model

from .models import UserEducation, UserWorkExperience, Skill

User = get_user_model()


class UserTests(APITestCase):
    def setUp(self):
        self.user_data = {
            "email": "user@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "securepass123",
        }

        self.other_user_data = {
            "email": "otheruser@example.com",
            "first_name": "Walter",
            "last_name": "Lee",
            "password": "securepass123",
        }
        self.admin_user = User.objects.create_superuser(
            email="admin@example.com",
            password="adminpass",
            first_name="Admin",
            last_name="User",
        )

    def test_user_registration(self):
        url = reverse("user-register")
        response = self.client.post(
            url,
            {
                **self.user_data,
                "password2": "securepass123",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_token_obtain(self):
        User.objects.create_user(**self.user_data)
        url = reverse("token_obtain_pair")
        response = self.client.post(
            url,
            {
                "email": self.user_data["email"],
                "password": self.user_data["password"],
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertIn("user", response.data)

    def test_user_detail(self):
        user = User.objects.create_user(**self.user_data)
        url = reverse("user-detail", kwargs={"pk": user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], user.email)

    def test_user_update_self(self):
        user = User.objects.create_user(**self.user_data)
        self.client.force_authenticate(user=user)
        url = reverse("user-update", kwargs={"pk": user.pk})
        response = self.client.patch(url, {"first_name": "Mark"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["first_name"], "Mark")

    def test_admin_update_user(self):
        user = User.objects.create_user(**self.user_data)
        self.client.force_authenticate(self.admin_user)
        url = reverse("user-update", kwargs={"pk": user.pk})
        response = self.client.patch(url, {"first_name": "John"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["first_name"], "John")

    def test_other_user_update(self):
        user = User.objects.create_user(**self.user_data)
        other_user = User.objects.create_user(**self.other_user_data)
        self.client.force_authenticate(user)
        url = reverse("user-update", kwargs={"pk": other_user.pk})
        response = self.client.patch(url, {"first_name": "Lee"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(
            response.data["detail"],
            "You do not have permission to perform this action.",
        )


class EducationExperienceTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="educator@example.com",
            password="pass1234",
            first_name="Edu",
            last_name="Cator",
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_education(self):
        url = reverse("user-update", kwargs={"pk": self.user.pk})
        data = {
            "institution": "Test University",
            "degree": "BSc",
            "field_of_study": "Computer Science",
            "start_year": 2015,
            "end_year": 2019,
            "description": "Learned stuff",
        }
        response = self.client.patch(url, {"educations": [data]}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(UserEducation.objects.count(), 1)

    def test_create_experience(self):
        url = reverse("user-update", kwargs={"pk": self.user.pk})
        data = {
            "company": "Test Corp",
            "position": "Developer",
            "start_date": "2020-01-01",
            "end_date": "2022-01-01",
            "description": "Worked on projects",
        }
        response = self.client.patch(url, {"experiences": [data]}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(UserWorkExperience.objects.count(), 1)
