from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class CustomUser(AbstractUser):
    profile_image = models.ImageField(
        upload_to='profile_images/', blank=True, null=True)
    user_title = models.CharField(max_length=255, null=True, blank=True)
    credits = models.IntegerField(default=0)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    description = models.TextField(max_length=5000, null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    country_code = models.CharField(max_length=10, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    # Education field: list of dictionaries
    education = models.JSONField(default=list, blank=True)

    # Experience field: list of dictionaries
    experience = models.JSONField(default=list, blank=True)

    # Skills and Interests: lists of strings
    skills = models.JSONField(default=list, blank=True)
    interests = models.JSONField(default=list, blank=True)

    # Social profiles
    website_url = models.URLField(null=True, blank=True)
    linkedin_profile = models.URLField(null=True, blank=True)
    github_profile = models.URLField(null=True, blank=True)
    twitter_profile = models.URLField(null=True, blank=True)
    reddit_profile = models.URLField(null=True, blank=True)
    instagram_profile = models.URLField(null=True, blank=True)
    linktree_profile = models.URLField(null=True, blank=True)

    groups = models.ManyToManyField(
        Group,
        related_name="customuser_set",  # Custom related name
        blank=True
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_set_permissions",  # Custom related name
        blank=True
    )

    def __str__(self):
        return self.username
