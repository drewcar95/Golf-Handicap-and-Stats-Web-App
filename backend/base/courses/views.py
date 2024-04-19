from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import GolfCourse, GolfHole
from .serializers import GolfCourseSerializer, GolfHoleSerializer, ExcelUploadSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404, render
from tablib import Dataset
# from .resources import GolfCourseResource
from django.http import Http404
from rest_framework.parsers import FileUploadParser
import pandas as pd
import openpyxl  


class ExportView(APIView):
    def get(self, request):
        # Export data to Excel
        golf_courses = GolfCourse.objects.all()
        resource = GolfCourseResource()
        dataset = resource.export(golf_courses)
        response = HttpResponse(
            dataset.xls, content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = 'attachment; filename="golf_courses.xls"'
        return response


class CreateCourseView(generics.CreateAPIView):
    queryset = GolfCourse.objects.all()
    serializer_class = GolfCourseSerializer

    def post(self, request, *args, **kwargs):
        serializer = GolfCourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetCourseView(APIView):
    def get(self, request, pk):
        try:
            course = GolfCourse.objects.get(pk=pk)
            serializer = GolfCourseSerializer(course)
            return Response(serializer.data)
        except GolfCourse.DoesNotExist:
            # Handle the case when the course with the specified ID doesn't exist
            return Response({"error": "Course not found"}, status=404)


class ListCoursesView(generics.ListAPIView):
    queryset = GolfCourse.objects.all()
    serializer_class = GolfCourseSerializer


class DeleteCourseView(generics.DestroyAPIView):
    queryset = GolfCourse.objects.all()
    serializer_class = GolfCourseSerializer
    lookup_field = ('course_name', 'course_tee_color')


class CreateHoleView(generics.CreateAPIView):
    queryset = GolfHole.objects.all()
    serializer_class = GolfHoleSerializer

    def post(self, request, *args, **kwargs):
        serializer = GolfHoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListHolesView(generics.ListAPIView):
    queryset = GolfHole.objects.all()
    serializer_class = GolfHoleSerializer

class ListSpecificCourseHoles(generics.ListAPIView):
    serializer_class = GolfHoleSerializer

    def get_queryset(self):
        course_id = self.kwargs.get('id', None)
        if course_id is not None:

            holes = GolfHole.objects.filter(golf_course=course_id)
            return holes


class ExcelUploadView(APIView):
    parser_classes = [FileUploadParser]

    def post(self, request, *args, **kwargs):
        serializer = ExcelUploadSerializer(data=request.data)

        if serializer.is_valid():
            excel_file = serializer.validated_data['excel_file']
            df = pd.read_excel(excel_file)

            

            return Response({'message': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


