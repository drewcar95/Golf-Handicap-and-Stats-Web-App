# Generated by Django 4.1.6 on 2024-01-24 20:53

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0005_remove_golfround_username_golfround_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="userstats",
            name="current_low_handicap",
            field=models.FloatField(default=54),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="userstats",
            name="low_handicap_date",
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]