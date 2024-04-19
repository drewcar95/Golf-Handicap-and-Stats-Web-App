import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

import csv
from base.courses.models import GolfCourse


with open("./starter_data/GolfCourses.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        _, created = GolfCourse.objects.update_or_create(
            id=row[0],  # Assuming course_id is a unique identifier
            defaults={
                'course_name': row[1],
                'course_tee_color': row[2],
                'course_yardage': row[3],
                'course_slope': row[4],
                'course_rating': row[5],
                'number_of_holes': row[6],
                'par_value': row[7],
            }
        )


import csv
from base.courses.models import GolfHole

with open("./starter_data/GolfHoles.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        _, created = GolfHole.objects.update_or_create(
            holeID=row[0],
            defaults={
                "golf_course_id":row[1],
                "course_hole_number":row[4],
                "par_value":row[5],
                "course_hole_rating":row[6],
                "hole_yardage":row[7],
            }
        )
