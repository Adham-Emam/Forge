from django.db import models
from users.models import CustomUser, Skill


class Project(models.Model):
    TYPE_CHOICES = [("traditional", "Traditional"), ("exchange", "Exchange")]
    STATUS_CHOICES = [
        ("active", "Active"),
        ("paused", "Paused"),
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    project_type = models.CharField(
        max_length=20, choices=TYPE_CHOICES, default="traditional"
    )

    offer_title = models.CharField(max_length=255)
    offer_description = models.TextField()
    offer_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    request_title = models.CharField(max_length=255, blank=True)
    request_description = models.TextField(blank=True)
    request_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    skills = models.ManyToManyField(Skill)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    owner = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="posted_projects"
    )
    assigned_to = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="assigned_projects",
    )

    deadline = models.DateField(null=True, blank=True)
    estimated_duration = models.IntegerField(blank=True, default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Proposal(models.Model):
    PROPOSAL_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    ]

    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="proposals"
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="proposals"
    )
    content = models.TextField()

    posted_at = models.DateField(auto_now_add=True)

    status = models.CharField(
        max_length=10, choices=PROPOSAL_STATUS_CHOICES, default="pending"
    )

    expected_delivery = models.IntegerField(default=0)
    proposed_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Proposal by {self.user} for {self.project}"
