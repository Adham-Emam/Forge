# Generated by Django 5.1.7 on 2025-05-03 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0006_alter_project_request_value"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="status",
            field=models.CharField(
                choices=[
                    ("active", "Active"),
                    ("paused", "Paused"),
                    ("in_progress", "In Progress"),
                    ("pending", "Pending"),
                    ("completed", "Completed"),
                ],
                default="pending",
                max_length=20,
            ),
        ),
    ]
