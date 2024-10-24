# Generated by Django 5.1 on 2024-10-10 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Projects', '0013_remove_project_applicants'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='status',
            field=models.CharField(choices=[('open', 'Open'), ('in_progress', 'In Progress'), ('closed', 'Closed')], default='open', max_length=20),
        ),
    ]
