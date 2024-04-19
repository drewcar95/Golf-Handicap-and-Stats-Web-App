from django.urls import path, re_path as url
from .views import CreateCourseView, GetCourseView, ListCoursesView, CreateHoleView, ListHolesView, DeleteCourseView, ExportView, ListSpecificCourseHoles
from . import views

urlpatterns = [
    path('export/', ExportView.as_view(), name='export'),
    path('get_course/<int:pk>/',
         GetCourseView.as_view(), name='get_course'),
    path('list_courses/', ListCoursesView.as_view(), name='list_courses'),
    path('delete_course/<str:course_name>/<str:course_tee_color>/',
         DeleteCourseView.as_view(), name='delete_course'),
    path('create_hole/', CreateHoleView.as_view(), name='create_hole'),
    path('list_holes/', ListHolesView.as_view(), name='list_holes'),
    path('get_specific_holes/<int:id>', ListSpecificCourseHoles.as_view(), name='get_specific_holes'),
]
