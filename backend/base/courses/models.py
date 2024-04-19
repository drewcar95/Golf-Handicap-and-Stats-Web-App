from django.db import models


class GolfCourse(models.Model):
    course_name = models.CharField(max_length=255)
    course_tee_color = models.CharField(max_length=50)
    course_yardage = models.PositiveIntegerField(
        default=0)  # Provide a suitable default value
    course_slope = models.FloatField()
    course_rating = models.FloatField()
    number_of_holes = models.PositiveIntegerField()
    par_value = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.course_name} - Tee Color: {self.course_tee_color}"

    class Meta:
        # Unique primary key
        unique_together = ('course_name', 'course_tee_color')


class GolfHole(models.Model):
    holeID = models.BigAutoField(primary_key=True)
    golf_course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE)
    course_hole_number = models.PositiveIntegerField()
    par_value = models.PositiveIntegerField()
    course_hole_rating = models.FloatField()
    hole_yardage = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.holeID}"

