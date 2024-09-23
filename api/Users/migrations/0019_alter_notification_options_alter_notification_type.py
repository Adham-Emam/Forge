# Generated by Django 5.1 on 2024-09-23 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0018_notification'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterField(
            model_name='notification',
            name='type',
            field=models.CharField(choices=[('welcome', 'Welcome'), ('message', 'Message'), ('project', 'Project'), ('bid', 'Bid')], max_length=255),
        ),
    ]
