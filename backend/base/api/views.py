from django.http import JsonResponse
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer
from django.http import JsonResponse
from django.views import View

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import UserStats, HandicapData, MyProfile
from .serializers import UserStatsSerializer, UserSerializer, HandicapDataSerializer, MyProfileSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone




class GetUserIdView(View):
    def get(self, request, *args, **kwargs):
        username = kwargs.get('username', None)

        if not username:
            return JsonResponse({'error': 'Username not provided'}, status=400)

        try:
            user_instance = User.objects.get(username=username)
            user_id = user_instance.id
            return JsonResponse({'user_id': user_id})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)


class UserStatsRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = UserStats.objects.all()
    serializer_class = UserStatsSerializer

    def get_object(self):
        username = self.kwargs.get('username', None)
        if username is not None:
            user_id = User.objects.get(username = username)
            stats = UserStats.objects.get(user = user_id)
        return stats


class GolfHandicapCreateAPIView(generics.CreateAPIView):
    serializer_class = HandicapDataSerializer
    queryset = HandicapData.objects.all()


class GetGolfHandicapAPIView(generics.ListAPIView):
    serializer_class = HandicapDataSerializer
    def get_queryset(self):
        username = self.kwargs.get('username', None)
        if username is not None:
            user = User.objects.get(username=username)
            # Use filter instead of get if there can be multiple HandicapData objects
            hc_history = HandicapData.objects.filter(user=user).order_by('date_time_update')[:10]
            return hc_history
        else:
            # Return an empty queryset if no username is provided
            return HandicapData.objects.none()

class UserStatsCreateAPIView(generics.CreateAPIView):
    queryset = UserStats.objects.all()
    serializer_class = UserStatsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Set the user to the authenticated user when creating a new instance
        serializer.save(user=self.request.user)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({'message': 'Logout successful'}, status=200)
        except Exception as e:
            return Response({'error': 'Invalid token'}, status=400)


class MyRegistrationView(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            # Create UserStats object for the newly registered user
            UserStats.objects.create(
                user=user,
                current_handicap_value=None,  # Set initial values to 0 or any default values you prefer
                current_low_handicap=None,
                low_handicap_date=timezone.now(),
                gir_per_round=0,
                fairways_per_round=0,
                putts_per_round=0,
                putts_per_hole=0,
                fairways_per_hole=0,
                total_holes_played=0
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def get_profile(request):
    try:
        my_profile = MyProfile.objects.first()
        if my_profile:
            response_data = {
                "linkedin_link": my_profile.linkedin_link,
                "github_link": my_profile.github_link,
                "user_summary": my_profile.user_summary,
                "highest_degree": my_profile.highest_degree,
                "degree_subject": my_profile.degree_subject,
            }
            return JsonResponse(response_data, content_type="application/json")
        else:
            return JsonResponse(
                {"error": "Profile not found"},
                status=404,
                content_type="application/json",
            )
    except MyProfile.DoesNotExist:
        # Handle case where the MyProfile model is empty
        return JsonResponse(
            {"error": "Profile not found"},
            status=404,
            content_type="application/json",
        )