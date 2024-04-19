from .models import GolfCourse
from django import forms


class GolfCourseForm(forms.Form):
    class Meta:
        model = GolfCourse
        fields = '__all__'
