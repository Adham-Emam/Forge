from django.db import models


class Badge(models.Model):
    GROUP_CHOICES = [
        ("starter", "Starter"),
        ("community", "Community"),
        ("skill mastery", "Skill Mastery"),
        ("elite", "Elite "),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    group = models.CharField(max_length=20, choices=GROUP_CHOICES, default="starter")
    image = models.URLField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Badge"
        verbose_name_plural = "Badges"
        ordering = ["name"]
