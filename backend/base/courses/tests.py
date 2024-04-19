from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import GolfCourse, GolfHole
from .serializers import GolfCourseSerializer, GolfHoleSerializer


class GolfCourseAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.course_data = {
            'course_name': 'Test Course',
            'course_tee_color': 'Red',
            'course_yardage': 7000,
            'course_slope': 120,
            'course_rating': 70.5,
            'number_of_holes': 18,
            'par_value': 72,
        }

    def test_create_course(self):
        response = self.client.post(
            reverse('golfcourse-create'), data=self.course_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_read_course(self):
        course = GolfCourse.objects.create(**self.course_data)
        print(reverse('golfcourse-detail',
              args=[course.course_name, course.course_tee_color]))
        response = self.client.get(reverse(
            'golfcourse-detail', args=[course.course_name, course.course_tee_color]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['course_name'],
                         self.course_data['course_name'])

    def test_update_course(self):
        course = GolfCourse.objects.create(**self.course_data)
        updated_data = {'course_yardage': 7200, 'course_rating': 71.0}
        response = self.client.put(reverse('golfcourse-detail', args=[
                                   course.course_name, course.course_tee_color]), data=updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['course_yardage'], updated_data['course_yardage'])
        self.assertEqual(
            response.data['course_rating'], updated_data['course_rating'])

    def test_delete_course(self):
        course = GolfCourse.objects.create(**self.course_data)
        response = self.client.delete(reverse(
            'golfcourse-detail', args=[course.course_name, course.course_tee_color]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(GolfCourse.objects.filter(pk=course.pk).exists())


class GolfHoleAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.course = GolfCourse.objects.create(
            course_name='Test Course',
            course_tee_color='Red',
            course_yardage=7000,
            course_slope=120,
            course_rating=70.5,
            number_of_holes=18,
            par_value=72,
        )
        self.hole_data = {
            'hole_number': 1,
            'par_value': 4,
            'course_hole_rating': 4.5,
            'hole_yardage': 400,
            'golf_course': self.course,  
        }

    def test_create_hole(self):
        response = self.client.post(
            reverse('golfhole-create'), data=self.hole_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_read_hole(self):
        hole = GolfHole.objects.create(**self.hole_data)
        response = self.client.get(reverse(
            'golfhole-detail', args=[self.course.course_name, self.course.course_tee_color, hole.hole_number]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['hole_number'],
                         self.hole_data['hole_number'])

    def test_update_hole(self):
        hole = GolfHole.objects.create(**self.hole_data)
        updated_data = {'par_value': 5, 'hole_yardage': 420}
        response = self.client.put(reverse('golfhole-detail', args=[
                                   self.course.course_name, self.course.course_tee_color, hole.hole_number]), data=updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['par_value'], updated_data['par_value'])
        self.assertEqual(
            response.data['hole_yardage'], updated_data['hole_yardage'])

    def test_delete_hole(self):
        hole = GolfHole.objects.create(**self.hole_data)
        response = self.client.delete(reverse(
            'golfhole-detail', args=[self.course.course_name, self.course.course_tee_color, hole.hole_number]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(GolfHole.objects.filter(pk=hole.pk).exists())
