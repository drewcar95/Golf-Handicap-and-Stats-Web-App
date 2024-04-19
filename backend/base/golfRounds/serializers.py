from rest_framework import serializers
from .models import GolfRound
from base.courses.models import GolfCourse


class GolfRoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = GolfRound
        fields = '__all__'

class GolfRoundUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GolfRound
        fields = '__all__'

class CombinedDataSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    course_id = serializers.IntegerField()
    course_name = serializers.CharField()
    tee_color = serializers.CharField()
    par_value = serializers.IntegerField()
    score = serializers.IntegerField()
    holes = serializers.IntegerField()
    

class RoundDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    date_time_played = serializers.DateTimeField()
    course_id = serializers.IntegerField()
    course_name = serializers.CharField()
    tee_color = serializers.CharField()
    course_yardage = serializers.IntegerField()


    hole1_score = serializers.IntegerField()  
    hole2_score = serializers.IntegerField()  
    hole3_score = serializers.IntegerField()
    hole4_score = serializers.IntegerField()
    hole5_score = serializers.IntegerField()
    hole6_score = serializers.IntegerField()
    hole7_score = serializers.IntegerField()
    hole8_score = serializers.IntegerField()
    hole9_score = serializers.IntegerField()
    hole10_score = serializers.IntegerField()
    hole11_score = serializers.IntegerField()
    hole12_score = serializers.IntegerField()
    hole13_score = serializers.IntegerField()
    hole14_score = serializers.IntegerField()
    hole15_score = serializers.IntegerField()
    hole16_score = serializers.IntegerField()
    hole17_score = serializers.IntegerField()  
    hole18_score = serializers.IntegerField()

    hole1_Putts = serializers.IntegerField()
    hole2_Putts = serializers.IntegerField()
    hole3_Putts = serializers.IntegerField()
    hole4_Putts = serializers.IntegerField()
    hole5_Putts = serializers.IntegerField()
    hole6_Putts = serializers.IntegerField()
    hole7_Putts = serializers.IntegerField()
    hole8_Putts = serializers.IntegerField()
    hole9_Putts = serializers.IntegerField()
    hole10_Putts = serializers.IntegerField()
    hole11_Putts = serializers.IntegerField()
    hole12_Putts = serializers.IntegerField()
    hole13_Putts = serializers.IntegerField()
    hole14_Putts = serializers.IntegerField()
    hole15_Putts = serializers.IntegerField()
    hole16_Putts = serializers.IntegerField()
    hole17_Putts = serializers.IntegerField()
    hole18_Putts = serializers.IntegerField()

    hole1_GIR = serializers.IntegerField()
    hole2_GIR = serializers.IntegerField()
    hole3_GIR = serializers.IntegerField()
    hole4_GIR = serializers.IntegerField()
    hole5_GIR = serializers.IntegerField()
    hole6_GIR = serializers.IntegerField()
    hole7_GIR = serializers.IntegerField()
    hole8_GIR = serializers.IntegerField()
    hole9_GIR = serializers.IntegerField()
    hole10_GIR = serializers.IntegerField()
    hole11_GIR = serializers.IntegerField()
    hole12_GIR = serializers.IntegerField()
    hole13_GIR = serializers.IntegerField()
    hole14_GIR = serializers.IntegerField()
    hole15_GIR = serializers.IntegerField()
    hole16_GIR = serializers.IntegerField()
    hole17_GIR = serializers.IntegerField()
    hole18_GIR = serializers.IntegerField()

    hole1_FWY = serializers.IntegerField()
    hole2_FWY = serializers.IntegerField()
    hole3_FWY = serializers.IntegerField()
    hole4_FWY = serializers.IntegerField()
    hole5_FWY = serializers.IntegerField()
    hole6_FWY = serializers.IntegerField()
    hole7_FWY = serializers.IntegerField()
    hole8_FWY = serializers.IntegerField()
    hole9_FWY = serializers.IntegerField()
    hole10_FWY = serializers.IntegerField()
    hole11_FWY = serializers.IntegerField()
    hole12_FWY = serializers.IntegerField()
    hole13_FWY = serializers.IntegerField()
    hole14_FWY = serializers.IntegerField()
    hole15_FWY = serializers.IntegerField()
    hole16_FWY = serializers.IntegerField()
    hole17_FWY = serializers.IntegerField()
    hole18_FWY = serializers.IntegerField()

    round_notes = serializers.CharField()

    total_gir = serializers.CharField()
    total_fwy = serializers.CharField()
    total_putts = serializers.CharField()
    total_score = serializers.IntegerField()
    total_holes = serializers.IntegerField()
    round_differential = serializers.IntegerField()