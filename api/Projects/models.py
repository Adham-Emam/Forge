from django.db import models
from Users.models import CustomUser


class Project(models.Model):
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('closed', 'Closed'),
        ('completed', 'Completed'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    skills_needed = models.JSONField(default=list, blank=True)
    budget = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='open')
    owner = models.ForeignKey(
        CustomUser, related_name='projects', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(
        CustomUser, related_name='assigned_projects', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title
