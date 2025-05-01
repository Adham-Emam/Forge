from django.db import models
from django.utils.text import slugify


class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    image = models.URLField(blank=True)
    reading_time = models.IntegerField(default=0)
    category = models.CharField(max_length=100)
    excerpt = models.TextField()
    content = models.TextField()
    posted_at = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-posted_at"]


class Comment(models.Model):
    name = models.CharField(max_length=200)
    body = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment '{self.title}' on {self.post.title}"

    class Meta:
        ordering = ["-created_at"]
