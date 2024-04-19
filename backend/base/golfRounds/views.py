from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import GolfRound
from base.courses.models import GolfCourse
from .serializers import GolfRoundSerializer, CombinedDataSerializer, RoundDetailSerializer, GolfRoundUpdateSerializer
from django.shortcuts import get_object_or_404
from .utils import calculate_handicap, simple_calc
from django.utils import timezone

from base.api.models import HandicapData, UserStats, User


class GolfRoundCreateAPIView(generics.CreateAPIView):
    serializer_class = GolfRoundSerializer
    queryset = GolfRound.objects.all()

    def perform_create(self, serializer):
        username = self.kwargs.get('username', None)
        user_id = serializer.validated_data.get('user', None) 
        if user_id is None:
            return 
        user_instance = User.objects.get(username=username)
        if user_instance is None:
            return 
        serializer.save()
        date_time_played = serializer.validated_data.get('date_time_played', None)
        total_holes = serializer.validated_data.get('total_holes', None)
        total_gir = serializer.validated_data.get('total_gir', None)
        total_fwy = serializer.validated_data.get('total_fwy', None)
        total_putts = serializer.validated_data.get('total_putts', None)

        handicap, low_handicap = calculate_handicap(user_instance)
        if handicap < -54:
            handicap = -54
        if low_handicap < -54:
            low_handicap = -54
        HandicapData.objects.create(user=user_instance, handicap_value=handicap, date_time_update=date_time_played)

        # Try to get UserStats for the user, create if it doesn't exist
        try:
            stats = UserStats.objects.get(user=user_instance)
        except UserStats.DoesNotExist:
            stats = UserStats.objects.create(
                user=user_instance,
                current_handicap_value=handicap,
                current_low_handicap=low_handicap,
                low_handicap_date=date_time_played,  # Or timezone.now() 
                gir_per_round=0,
                fairways_per_round=0,
                putts_per_round=0,
                total_holes_played=total_holes  
            )

        # Update UserStats based on handicap and low handicap
        if handicap == low_handicap:
            stats.current_handicap_value = handicap
            stats.current_low_handicap = low_handicap
            stats.low_handicap_date = date_time_played
        else:
            stats.current_handicap_value = handicap
        stats.save()
        
        rounds = GolfRound.objects.filter(user__username=username).exclude(
            total_gir__exact='', 
            total_putts__exact='',
            total_fwy__exact='', 
        )

        total_holes = 0
        total_girs = 0
        total_putts = 0
        total_fairways = 0
        total_rounds = rounds.count()
        

        for golf_round in rounds:
            total_holes += golf_round.total_holes
            total_girs += int(golf_round.total_gir)
            if golf_round.total_fwy != '':
                total_fairways += int(golf_round.total_fwy)
            total_putts += int(golf_round.total_putts)
            

        
        if total_rounds > 0:
            stats.gir_per_round = gir_per_round=(total_girs/total_rounds)
            stats.putts_per_round = (total_putts/total_rounds)
            stats.putts_per_hole=(total_putts/total_holes)
            stats.fairways_per_round=(total_fairways/total_rounds)
            stats.fairways_per_hole=(total_fairways/total_holes)
            stats.total_holes_played=total_holes
            # UserStats.objects.update(user = user_instance, gir_per_round=(total_girs/total_rounds), putts_per_round=(total_putts/total_rounds), putts_per_hole=(total_putts/total_holes), fairways_per_round=(total_fairways/total_rounds), fairways_per_hole=(total_fairways/total_holes), total_holes_played=total_holes)
        else: 
            return

        return
   

class SpecificRoundView(generics.RetrieveAPIView):
    serializer_class = RoundDetailSerializer

    def get_object(self):
        username = self.kwargs.get('username', None)
        round_id = self.kwargs.get('id', None)

        if username is not None and round_id is not None:
            try:
                round_instance = GolfRound.objects.get(
                    user__username=username, id=round_id)
                course = GolfCourse.objects.get(
                    id=round_instance.golf_course_id)
                
                combined_data = {
                    'id': round_instance.id,
                    'date_time_played': round_instance.date_time_played,
                    'course_id': course.id,
                    'course_name': course.course_name,
                    'tee_color': course.course_tee_color,
                    'course_yardage': course.course_yardage,

                    'hole1_score': round_instance.hole1_score,
                    'hole2_score': round_instance.hole2_score,
                    'hole3_score': round_instance.hole3_score,
                    'hole4_score': round_instance.hole4_score,
                    'hole5_score': round_instance.hole5_score,
                    'hole6_score': round_instance.hole6_score,
                    'hole7_score': round_instance.hole7_score,
                    'hole8_score': round_instance.hole8_score,
                    'hole9_score': round_instance.hole9_score,
                    'hole10_score': round_instance.hole10_score,
                    'hole11_score': round_instance.hole11_score,
                    'hole12_score': round_instance.hole12_score,
                    'hole13_score': round_instance.hole13_score,
                    'hole14_score': round_instance.hole14_score,
                    'hole15_score': round_instance.hole15_score,
                    'hole16_score': round_instance.hole16_score,
                    'hole17_score': round_instance.hole17_score,
                    'hole18_score': round_instance.hole18_score,

                    'hole1_Putts': round_instance.hole1_Putts,
                    'hole2_Putts': round_instance.hole2_Putts,
                    'hole3_Putts': round_instance.hole3_Putts,
                    'hole4_Putts': round_instance.hole4_Putts,
                    'hole5_Putts': round_instance.hole5_Putts,
                    'hole6_Putts': round_instance.hole6_Putts,
                    'hole7_Putts': round_instance.hole7_Putts,
                    'hole8_Putts': round_instance.hole8_Putts,
                    'hole9_Putts': round_instance.hole9_Putts,
                    'hole10_Putts': round_instance.hole10_Putts,
                    'hole11_Putts': round_instance.hole11_Putts,
                    'hole12_Putts': round_instance.hole12_Putts,
                    'hole13_Putts': round_instance.hole13_Putts,
                    'hole14_Putts': round_instance.hole14_Putts,
                    'hole15_Putts': round_instance.hole15_Putts,
                    'hole16_Putts': round_instance.hole16_Putts,
                    'hole17_Putts': round_instance.hole17_Putts,
                    'hole18_Putts': round_instance.hole18_Putts,


                    'hole1_GIR': round_instance.hole1_GIR,
                    'hole2_GIR': round_instance.hole2_GIR,
                    'hole3_GIR': round_instance.hole3_GIR,
                    'hole4_GIR': round_instance.hole4_GIR,
                    'hole5_GIR': round_instance.hole5_GIR,
                    'hole6_GIR': round_instance.hole6_GIR,
                    'hole7_GIR': round_instance.hole7_GIR,
                    'hole8_GIR': round_instance.hole8_GIR,
                    'hole9_GIR': round_instance.hole9_GIR,
                    'hole10_GIR': round_instance.hole10_GIR,
                    'hole11_GIR': round_instance.hole11_GIR,
                    'hole12_GIR': round_instance.hole12_GIR,
                    'hole13_GIR': round_instance.hole13_GIR,
                    'hole14_GIR': round_instance.hole14_GIR,
                    'hole15_GIR': round_instance.hole15_GIR,
                    'hole16_GIR': round_instance.hole16_GIR,
                    'hole17_GIR': round_instance.hole17_GIR,
                    'hole18_GIR': round_instance.hole18_GIR,

                    'hole1_FWY': round_instance.hole1_FWY,
                    'hole2_FWY': round_instance.hole2_FWY,
                    'hole3_FWY': round_instance.hole3_FWY,
                    'hole4_FWY': round_instance.hole4_FWY,
                    'hole5_FWY': round_instance.hole5_FWY,
                    'hole6_FWY': round_instance.hole6_FWY,
                    'hole7_FWY': round_instance.hole7_FWY,
                    'hole8_FWY': round_instance.hole8_FWY,
                    'hole9_FWY': round_instance.hole9_FWY,
                    'hole10_FWY': round_instance.hole10_FWY,
                    'hole11_FWY': round_instance.hole11_FWY,
                    'hole12_FWY': round_instance.hole12_FWY,
                    'hole13_FWY': round_instance.hole13_FWY,
                    'hole14_FWY': round_instance.hole14_FWY,
                    'hole15_FWY': round_instance.hole15_FWY,
                    'hole16_FWY': round_instance.hole16_FWY,
                    'hole17_FWY': round_instance.hole17_FWY,
                    'hole18_FWY': round_instance.hole18_FWY,

                    'round_notes': round_instance.round_notes,
                    'total_gir': round_instance.total_gir,
                    'total_putts': round_instance.total_putts,
                    'total_fwy': round_instance.total_fwy,
                    'total_score': round_instance.total_score,
                    'total_holes': round_instance.total_holes,
                    'round_differential': round_instance.round_differential,
                    
                    # Add other fields from GolfRound as needed
                }

                return combined_data
            except GolfRound.DoesNotExist:
                # Handle the case where the round is not found
                raise Http404("Round not found.")
        else:
            # Handle the case where either username or round_id is None
            raise Http404("Invalid request parameters.")


class ListRoundsView(generics.ListAPIView):
    serializer_class = CombinedDataSerializer

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        if username is not None:
            rounds = GolfRound.objects.filter(user__username=username)
            course_ids = rounds.values_list(
                'golf_course_id', flat=True).distinct()
            courses = GolfCourse.objects.filter(id__in=course_ids)

            combined_data = []
            for round in rounds:
                course = courses.filter(id=round.golf_course_id).first()
                if course:
                    combined_data.append({
                        'id': round.id,
                        'course_id': course.id,
                        'course_name': course.course_name,
                        'tee_color': course.course_tee_color,
                        'par_value': course.par_value,
                        'score': round.total_score,
                        'holes': round.total_holes,
                    })

            return combined_data
        else:
            return []

class ListLatestRoundsView(generics.ListAPIView):
    serializer_class = CombinedDataSerializer

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        if username is not None:
            rounds = GolfRound.objects.filter(user__username=username)
            course_ids = rounds.values_list('golf_course_id', flat=True).distinct()
            courses = GolfCourse.objects.filter(id__in=course_ids)

            rounds = rounds.order_by('date_time_played').distinct()[:3]

            combined_data = []
            for golf_round in rounds:
                course = courses.filter(id=golf_round.golf_course_id).first()
                if course:
                    combined_data.append({
                        'id': golf_round.id,
                        'course_name': course.course_name,
                        'course_id': course.id,
                        'tee_color': course.course_tee_color,
                        'par_value': course.par_value,
                        'score': golf_round.total_score,
                        'holes': golf_round.total_holes,
                    })

            return combined_data
        else:
            return []

class ListLatest10RoundsView(generics.ListAPIView):
    serializer_class = CombinedDataSerializer

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        if username is not None:
            rounds = GolfRound.objects.filter(user__username=username)
            course_ids = rounds.values_list('golf_course_id', flat=True).distinct()
            courses = GolfCourse.objects.filter(id__in=course_ids)

            rounds = rounds.order_by('date_time_played').distinct()[:10]

            combined_data = []
            for golf_round in rounds:
                course = courses.filter(id=golf_round.golf_course_id).first()
                if course:
                    combined_data.append({
                        'id': golf_round.id,
                        'course_name': course.course_name,
                        'course_id': course.id,
                        'tee_color': course.course_tee_color,
                        'par_value': course.par_value,
                        'score': golf_round.total_score,
                        'holes': golf_round.total_holes,
                    })

            return combined_data
        else:
            return []

class ListTopRoundsView(generics.ListAPIView):
    serializer_class = CombinedDataSerializer

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        if username is not None:
            rounds = GolfRound.objects.filter(user__username=username)
            course_ids = rounds.values_list('golf_course_id', flat=True).distinct()
            courses = GolfCourse.objects.filter(id__in=course_ids)

            rounds = rounds.order_by('total_score')[:3]

            combined_data = []
            for golf_round in rounds:
                course = courses.filter(id=golf_round.golf_course_id).first()
                if course:
                    combined_data.append({
                        'id': golf_round.id,
                        'course_name': course.course_name,
                        'course_id': course.id,
                        'tee_color': course.course_tee_color,
                        'par_value': course.par_value,
                        'score': golf_round.total_score,
                        'holes': golf_round.total_holes,
                    })

            return combined_data
        else:
            return []


class GolfRoundRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GolfRound.objects.all()
    serializer_class = GolfRoundUpdateSerializer

    def update(self, request, *args, **kwargs):
        username = self.kwargs.get('username', None)
        round_id = self.kwargs.get('pk', None)
        try:
            user_instance = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            round_instance = GolfRound.objects.get(id=round_id)
        except GolfRound.DoesNotExist:
            return Response({'detail': 'Round not found'}, status=status.HTTP_404_NOT_FOUND)

        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(
            round_instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        self.perform_update(serializer)

        print(serializer.data['hole6_score'])
        round_instance.save()

        

        handicap, low_handicap = calculate_handicap(user_instance)
        HandicapData.objects.update(user=user_instance, handicap_value= handicap, date_time_update= timezone.now())
        UserStats.objects.update(current_handicap_value=handicap)

        return Response(serializer.data)

class GolfRoundDeleteAPIView(generics.DestroyAPIView):
    queryset = GolfRound.objects.all()
    serializer_class = GolfRoundSerializer
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        username = self.kwargs.get('username', None)
        try:
            user_instance = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        instance = self.get_object()
        self.perform_destroy(instance)

        # Delete HandicapData associated with the user and the specific GolfRound
        HandicapData.objects.filter(user=user_instance, date_time_update=instance.date_time_played).delete()

        # Recalculate and update UserStats
        handicap = calculate_handicap(user_instance)
        HandicapData.objects.update_or_create(user=user_instance, defaults={'handicap_value': handicap, 'date_time_update': timezone.now()})
        UserStats.objects.update(current_handicap_value=handicap)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()