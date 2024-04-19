#Tests for golfround creation deletion updates
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from datetime import datetime
from django.contrib.auth.models import User
from base.golfRounds.models import GolfRound
from base.api.models import UserStats

class GolfRoundCreateAPIViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_create_golf_round(self):
        url = reverse('golf-round-list-create', kwargs={'username': self.user.username})
        data = {
            'date_time_played': datetime.now(),
            # Add other required fields here
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Check if UserStats were created correctly
        user_stats = UserStats.objects.filter(user=self.user).first()
        self.assertIsNotNone(user_stats)
        # Add more assertions to check UserStats attributes if needed

    def test_create_golf_round_invalid_user(self):
        url = reverse('golf-round-list-create', kwargs={'username': 'nonexistentuser'})
        data = {
            'date_time_played': datetime.now(),
            # Add other required fields here
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        # Add more assertions to test error response content