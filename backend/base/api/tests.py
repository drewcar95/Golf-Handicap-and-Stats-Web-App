from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import UserStats  
from rest_framework_simplejwt.tokens import RefreshToken


class AuthenticationTests(TestCase):
    def setUp(self):
        # Create a test user
        self.username = 'testuser'
        self.password = 'testpassword'
        self.first_name = 'Test'
        self.last_name = 'User'
        self.user = User.objects.create_user(
            username=self.username, password=self.password)

        self.client = APIClient()

    def test_user_registration(self):
        url = reverse('register')
        data = {'username': 'newuser', 'password': 'newpassword',
                'first_name': 'New', 'last_name': 'User'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertTrue(User.objects.filter(username='newuser').exists())
        self.assertTrue(UserStats.objects.filter(
            user__username='newuser').exists())

    def test_user_login(self):
        login_url = reverse('token_obtain_pair')
        login_data = {'username': self.username, 'password': self.password}
        login_response = self.client.post(login_url, login_data, format='json')

        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn('access', login_response.data)
        access_token = login_response.data['access']

    def test_logout(self):
        login_url = reverse('token_obtain_pair')
        login_data = {'username': self.username, 'password': self.password}
        login_response = self.client.post(login_url, login_data, format='json')
        access_token = login_response.data['access']

        url = reverse('logout')
        data = {'refresh_token': login_response.data['refresh']}
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
