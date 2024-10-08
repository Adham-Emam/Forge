# Generated by Django 5.1 on 2024-09-18 05:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Projects', '0005_bid_proposal'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bid',
            options={},
        ),
        migrations.AlterField(
            model_name='project',
            name='assigned_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_projects', to=settings.AUTH_USER_MODEL),
        ),
    ]
