# Generated by Django 5.1.7 on 2025-05-01 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0002_remove_project_updated_at_project_project_type_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="request_value",
            field=models.DecimalField(decimal_places=2, default=True, max_digits=10),
        ),
    ]
