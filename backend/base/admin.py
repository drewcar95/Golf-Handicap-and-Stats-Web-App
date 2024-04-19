from django.contrib import admin

# Register your models here.
from base.courses.models import GolfCourse, GolfHole
from base.golfRounds.models import GolfRound
from base.api.models import UserStats, HandicapData, MyProfile


admin.site.register(GolfCourse)
admin.site.register(GolfHole)
admin.site.register(GolfRound)
admin.site.register(UserStats)
admin.site.register(HandicapData)
admin.site.register(MyProfile)