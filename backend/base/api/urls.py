from django.urls import path
from . import views
from .views import MyTokenObtainPairView, UserStatsRetrieveUpdateAPIView, UserStatsCreateAPIView, MyRegistrationView, GolfHandicapCreateAPIView, GetGolfHandicapAPIView, GetUserIdView, get_profile
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('user-stats/<str:username>/', UserStatsRetrieveUpdateAPIView.as_view(),
         name='user-stats-retrieve-update'),
    path('user-stats/create/', UserStatsCreateAPIView.as_view(),
         name='user-stats-create'),
    path('register/', MyRegistrationView.as_view(), name='registration-view'),
    path('store_handicap/<str:username>/',
         GolfHandicapCreateAPIView.as_view(), name='store-new-view'),
    path('get_handicap/<str:username>/',
         GetGolfHandicapAPIView.as_view(), name='store-new-view'),
    path('get-user-id/<str:username>/', GetUserIdView.as_view(), name='get_user_id'),
    path(
        "profile-info/",
        get_profile,
        name="get_profile",
    ),
]
