# Generated by Django 5.1 on 2024-08-28 03:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0005_rename_location_customuser_country_customuser_gender_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='phone',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
