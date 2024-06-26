from django.db import models
from django.contrib.auth.models import User
from base.courses.models import GolfCourse


class GolfRound(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    golf_course = models.ForeignKey(
        GolfCourse, default="Test Golf Course Blue", on_delete=models.CASCADE)
    date_time_played = models.DateTimeField()
    hole1_score = models.PositiveIntegerField(null = True, blank=True)  
    hole2_score = models.PositiveIntegerField(null = True, blank=True)  
    hole3_score = models.PositiveIntegerField(null = True, blank=True) 
    hole4_score = models.PositiveIntegerField(null = True, blank=True)  
    hole5_score = models.PositiveIntegerField(null = True, blank=True)  
    hole6_score = models.PositiveIntegerField(null = True, blank=True) 
    hole7_score = models.PositiveIntegerField(null = True, blank=True)  
    hole8_score = models.PositiveIntegerField(null = True, blank=True) 
    hole9_score = models.PositiveIntegerField(null = True, blank=True)  
    hole10_score = models.PositiveIntegerField(null = True, blank=True) 
    hole11_score = models.PositiveIntegerField(null = True, blank=True)  
    hole12_score = models.PositiveIntegerField(null = True, blank=True) 
    hole13_score = models.PositiveIntegerField(null = True, blank=True) 
    hole14_score = models.PositiveIntegerField(null = True, blank=True) 
    hole15_score = models.PositiveIntegerField(null = True, blank=True)  
    hole16_score = models.PositiveIntegerField(null = True, blank=True) 
    hole17_score = models.PositiveIntegerField(null = True, blank=True) 
    hole18_score = models.PositiveIntegerField(null = True, blank=True) 

    hole1_Putts = models.PositiveIntegerField(null = True, blank=True)  
    hole2_Putts = models.PositiveIntegerField(null = True, blank=True) 
    hole3_Putts = models.PositiveIntegerField(null = True, blank=True)  
    hole4_Putts = models.PositiveIntegerField(null = True, blank=True)  
    hole5_Putts = models.PositiveIntegerField(null = True, blank=True) 
    hole6_Putts = models.PositiveIntegerField(null = True, blank=True)
    hole7_Putts = models.PositiveIntegerField(null = True, blank=True) 
    hole8_Putts = models.PositiveIntegerField(null = True, blank=True)
    hole9_Putts = models.PositiveIntegerField(null = True, blank=True) 
    hole10_Putts = models.PositiveIntegerField(null = True, blank=True) 
    hole11_Putts = models.PositiveIntegerField(null = True, blank=True)  
    hole12_Putts = models.PositiveIntegerField(null = True, blank=True)
    hole13_Putts = models.PositiveIntegerField(null = True, blank=True)  
    hole14_Putts = models.PositiveIntegerField(null = True, blank=True)  
    hole15_Putts = models.PositiveIntegerField(null = True, blank=True)  
    hole16_Putts = models.PositiveIntegerField(null = True, blank=True)  
    hole17_Putts = models.PositiveIntegerField(null = True, blank=True)  
    hole18_Putts = models.PositiveIntegerField(null = True, blank=True)  

    hole1_GIR = models.BooleanField(null=True)  
    hole2_GIR = models.BooleanField(null=True)  
    hole3_GIR = models.BooleanField(null=True)  
    hole4_GIR = models.BooleanField(null=True)  
    hole5_GIR = models.BooleanField(null=True) 
    hole6_GIR = models.BooleanField(null=True)  
    hole7_GIR = models.BooleanField(null=True) 
    hole8_GIR = models.BooleanField(null=True) 
    hole9_GIR = models.BooleanField(null=True)  
    hole10_GIR = models.BooleanField(null=True)  
    hole11_GIR = models.BooleanField(null=True)  
    hole12_GIR = models.BooleanField(null=True)  
    hole13_GIR = models.BooleanField(null=True) 
    hole14_GIR = models.BooleanField(null=True)  
    hole15_GIR = models.BooleanField(null=True)  
    hole16_GIR = models.BooleanField(null=True)  
    hole17_GIR = models.BooleanField(null=True) 
    hole18_GIR = models.BooleanField(null=True) 


    hole1_FWY = models.BooleanField(null=True) 
    hole2_FWY = models.BooleanField(null=True)  
    hole3_FWY = models.BooleanField(null=True) 
    hole4_FWY = models.BooleanField(null=True)  
    hole5_FWY = models.BooleanField(null=True)  
    hole6_FWY = models.BooleanField(null=True)  
    hole7_FWY = models.BooleanField(null=True)  
    hole8_FWY = models.BooleanField(null=True)  
    hole9_FWY = models.BooleanField(null=True)  
    hole10_FWY = models.BooleanField(null=True)  
    hole11_FWY = models.BooleanField(null=True)  
    hole12_FWY = models.BooleanField(null=True)  
    hole13_FWY = models.BooleanField(null=True)  
    hole14_FWY = models.BooleanField(null=True) 
    hole15_FWY = models.BooleanField(null=True)  
    hole16_FWY = models.BooleanField(null=True)  
    hole17_FWY = models.BooleanField(null=True)  
    hole18_FWY = models.BooleanField(null=True)  

    round_notes = models.TextField(max_length=500, blank=True)

    total_gir = models.CharField(max_length=18, blank=True)
    total_fwy = models.CharField(max_length=18, blank=True)
    total_putts = models.CharField(max_length=50, blank=True)
    total_score = models.PositiveIntegerField()
    total_holes = models.PositiveIntegerField()
    round_differential = models.FloatField()

    def __str__(self):
        return f"{self.user.username} - Round {self.id}"
