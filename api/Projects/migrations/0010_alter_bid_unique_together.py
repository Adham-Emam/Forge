# Generated by Django 5.1 on 2024-09-22 18:07

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Projects', '0009_bid_duration_alter_project_type'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='bid',
            unique_together={('project', 'user')},
        ),
    ]
