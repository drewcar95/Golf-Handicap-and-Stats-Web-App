from django.urls import path
from .views import GolfRoundCreateAPIView, GolfRoundRetrieveUpdateDestroyAPIView, ListRoundsView, SpecificRoundView, GolfRoundDeleteAPIView, ListLatestRoundsView, ListLatest10RoundsView, ListTopRoundsView

urlpatterns = [
    path('post-round/<str:username>', GolfRoundCreateAPIView.as_view(),
         name='golf-round-list-create'),
    path('golf-rounds/<int:pk>/', GolfRoundRetrieveUpdateDestroyAPIView.as_view(),
         name='golf-round-retrieve-update-destroy'),
    path('list-rounds/<str:username>/', ListRoundsView.as_view(),
         name='golf-round-list-create'),
    path('latest-rounds/<str:username>/', ListLatestRoundsView.as_view(),
         name='golf-round-list-latest-5'),
    path('top-rounds/<str:username>/', ListTopRoundsView.as_view(),
         name='golf-round-list-latest-5'), 
    path('get-round/<str:username>/<int:id>', SpecificRoundView.as_view(),
         name='golf-round-list-create'),
     path('delete-round/<str:username>/<int:pk>', GolfRoundDeleteAPIView.as_view(),
         name='golf-round-delete'),
     path('latest-10-rounds/<str:username>/', ListLatest10RoundsView.as_view(),
         name='golf-round-list-latest-10'),

     path('update-round/<str:username>/<int:pk>/', GolfRoundRetrieveUpdateDestroyAPIView.as_view(),
         name='update-round'),

]
