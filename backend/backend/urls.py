
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
# from django.views.generic import TemplateView



urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include('base.api.urls')),
    path("courses/", include('base.courses.urls')),
    path("golfRounds/", include('base.golfRounds.urls')),
]

