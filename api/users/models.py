from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import MinValueValidator
from .managers import CustomUserManager

from badges.models import Badge


class CustomUser(AbstractBaseUser, PermissionsMixin):
    AVAILABILITY_CHOICES = [
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("remote", "Remote"),
        ("flexible", "Flexible"),
        ("not_available", "Not Available"),
    ]
    LEVEL_CHOICES = [
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("expert", "Expert"),
    ]

    # Authentication fields
    username = None
    email = models.EmailField(
        unique=True,
        error_messages={"unique": "This email is already registered."},
    )

    # User details
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    level = models.CharField(
        max_length=50,
        choices=LEVEL_CHOICES,
        default="beginner",
    )
    country_code = models.CharField(max_length=5, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)

    # User type and status
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Freelancer-specific fields
    credit_amount = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    title = models.CharField(max_length=200, blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    skills = models.JSONField(blank=True, null=True, default=list)
    hourly_rate = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    availability = models.CharField(
        max_length=100, choices=AVAILABILITY_CHOICES, default="full_time"
    )

    social_links = models.JSONField(
        blank=True,
        null=True,
        default=dict,
        help_text="Social media links in JSON format",
    )  # Stores social media links as a JSON object

    #  Badges
    badges = models.ManyToManyField(Badge, blank=True, related_name="users")

    # Client-specific fields
    company_name = models.CharField(max_length=200, blank=True, null=True)
    company_website = models.URLField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
