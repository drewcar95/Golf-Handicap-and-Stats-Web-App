from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserStats, HandicapData, MyProfile
from rest_framework.validators import UniqueValidator

class MyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyProfile
        fields = "__all__"
        partial = True


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name']


class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = '__all__'


class HandicapDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HandicapData
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            password=validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = ('username', 'password')
