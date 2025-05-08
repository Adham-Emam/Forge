from django.db import models


class Thread(models.Model):
    user1 = models.ForeignKey(
        "users.CustomUser",
        related_name="thread_initiated",
        on_delete=models.CASCADE,
    )
    user2 = models.ForeignKey(
        "users.CustomUser",
        related_name="thread_received",
        on_delete=models.CASCADE,
    )

    project = models.ForeignKey(
        "projects.Project", null=True, blank=True, on_delete=models.SET_NULL
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user1", "user2", "project")

    def __str__(self):
        return f"Thread between {self.user1} and {self.user2}"


class Message(models.Model):
    thread = models.ForeignKey(
        Thread, related_name="messages", on_delete=models.CASCADE
    )
    sender = models.ForeignKey("users.CustomUser", on_delete=models.CASCADE)
    text = models.TextField()
    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Message from {self.sender} at {self.created_at}"
