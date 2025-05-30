from django.contrib import admin
from .models import Badge


class BadgeAdmin(admin.ModelAdmin):
    model = Badge
    list_display = ("name", "group", "image", "description")
    search_fields = ("name", "group", "description")
    list_filter = ("group",)


admin.site.register(Badge, BadgeAdmin)
