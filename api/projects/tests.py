from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from users.models import CustomUser, Skill
from .models import Project, Proposal


class ProjectProposalTests(APITestCase):
    def setUp(self):
        self.skill = Skill.objects.create(name="Python")

        self.user1 = CustomUser.objects.create_user(
            email="user1@example.com",
            first_name="User",
            last_name="One",
            password="pass1234",
        )
        self.user2 = CustomUser.objects.create_user(
            email="user2@example.com",
            first_name="User",
            last_name="Two",
            password="pass1234",
        )

        self.project = Project.objects.create(
            title="Test Project",
            category="Web Development",
            project_type="traditional",
            offer_title="Build a website",
            offer_description="Need a simple website built.",
            offer_value=500,
            owner=self.user1,
            status="active",
        )
        self.project.skills.add(self.skill)

    def test_list_projects(self):
        url = reverse("project-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_authenticated(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse("project-create")
        data = {
            "title": "New Project",
            "category": "Design",
            "project_type": "traditional",
            "offer_title": "Design a logo",
            "offer_description": "Need a logo",
            "offer_value": 100,
            "estimated_duration": 7,
            "skills": [self.skill.id],
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_project_unauthenticated(self):
        url = reverse("project-create")
        response = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_proposal_valid(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("proposal-create", kwargs={"project_id": self.project.id})
        data = {
            "content": "I'd love to help with this project!",
            "expected_delivery": 5,
            "proposed_value": 450,
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Proposal.objects.count(), 1)

    def test_create_proposal_to_own_project(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse("proposal-create", kwargs={"project_id": self.project.id})
        data = {
            "content": "Trying to propose to my own project",
            "expected_delivery": 5,
            "proposed_value": 450,
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_propose_twice(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("proposal-create", kwargs={"project_id": self.project.id})
        data = {
            "content": "First proposal",
            "expected_delivery": 5,
            "proposed_value": 450,
        }
        self.client.post(url, data)
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_project_detail(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse("project-detail", kwargs={"pk": self.project.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_project_by_owner(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse("project-update-destroy", kwargs={"pk": self.project.id})
        data = {"title": "Updated Title"}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_project_by_non_owner(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("project-update-destroy", kwargs={"pk": self.project.id})
        data = {"title": "Hacked Title"}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
