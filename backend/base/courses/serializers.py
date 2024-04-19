from rest_framework import serializers
from .models import GolfCourse, GolfHole


class GolfCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = GolfCourse
        fields = ('__all__')


class ExcelUploadSerializer(serializers.Serializer):
    excel_file = serializers.FileField()



class GolfHoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = GolfHole
        fields = '__all__'
