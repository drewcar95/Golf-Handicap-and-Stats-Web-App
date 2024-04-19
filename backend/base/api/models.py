from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator


class UserStats(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    current_handicap_value = models.FloatField(null=True, blank=True)
    current_low_handicap = models.FloatField(null=True, blank=True)
    low_handicap_date = models.DateTimeField(null=True, blank=True)
    gir_per_round = models.FloatField(null=True,blank=True)
    fairways_per_round = models.FloatField(null=True,blank=True)
    putts_per_round = models.FloatField(null=True,blank=True)
    putts_per_hole = models.FloatField(null=True,blank=True)
    fairways_per_hole = models.FloatField(null=True, blank=True)
    total_holes_played = models.PositiveIntegerField()


    def __str__(self):
        return f"{self.user.username} - Stats"


class HandicapData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    handicap_value = models.FloatField()
    date_time_update = models.DateTimeField()

    def __str__(self):
        return f"{self.user.username} - Historical Handicap Data"


class MyProfile(models.Model):
    linkedin_link = models.URLField(
        validators=[RegexValidator(r"^https://www.linkedin.com/in/*")],
        null=True,
        blank=True,
    )
    github_link = models.URLField(
        validators=[RegexValidator(r"^https://github.com/*")], null=True, blank=True
    )
    user_summary = models.TextField(null=True, blank=True)
    highest_degree = models.CharField(max_length=50, default="", null=True, blank=True)
    degree_subject = models.CharField(max_length=50, default="", null=True, blank=True)

    def __str__(self):
        return f"{self.id}"
