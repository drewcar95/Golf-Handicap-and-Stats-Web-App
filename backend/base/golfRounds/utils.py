from base.api.models import HandicapData, UserStats
from datetime import timedelta
from .models import GolfRound

def simple_calc():
    return 15+15

def calculate_handicap(user):
    recent_rounds = GolfRound.objects.filter(user=user).order_by('date_time_played')[:20]
    differentials = []

    try:
        user_stats = UserStats.objects.get(user=user)
        low_handicap = user_stats.current_low_handicap
        low_handicap_date = user_stats.low_handicap_date
    except UserStats.DoesNotExist:
        low_handicap = None
        low_handicap_date = None

    for round in recent_rounds:
        differential = round.round_differential
        differentials.append(differential)

    differentials.sort()

    #If rounds less than 5, calculate with lowest 1 differential. 

    if len(differentials) < 4:
        best_differentials = differentials[:1]
        adjustment = -2
    
    if len(differentials) > 3 and len(differentials) < 5:
        best_differentials = differentials[:1]
        adjustment = -1

    if len(differentials) > 4 and len(differentials) < 6:
        best_differentials = differentials[:1]   
        adjustment = 0 

    #If 6 rounds calculate this way 
    if len(differentials) == 6:
        best_differentials = differentials[:2]
        adjustment = -1

    #If 7-8 rounds calculate this way 
    if len(differentials) > 6 and len(differentials) < 9:
        best_differentials = differentials[:2]
        adjustment = 0 

    #If 9-11 rounds calculate this way 
    if len(differentials) > 8 and len(differentials) < 12:
        best_differentials = differentials[:3]
        adjustment = 0 

    #if 12-14 rounds calculate this way 
    if len(differentials) > 11 and len(differentials) < 15:
        best_differentials = differentials[:4]
        adjustment = 0 

    #If 15-16 rounds calculate this way 
    if len(differentials) > 14 and len(differentials) < 17:
        best_differentials = differentials[:5]
        adjustment = 0 

    #if 17-18 rounds calculate this way 
    if len(differentials) > 16 and len(differentials) < 19:
        best_differentials = differentials[:6]
        adjustment = 0 

    #If 19 rounds, calc this way 
    if len(differentials) == 19:
        best_differentials = differentials[:7]
        adjustment = 0 

    #If 20 rounds, calc this way
    if len(differentials) >= 20:
        best_differentials = differentials[:8]
        adjustment = 0 

    handicap = (sum(best_differentials) / len(best_differentials) * 0.96) + adjustment


    # Check if there are at least 20 rounds for the low handicap calculation
    if len(differentials) >= 20:

        if low_handicap is not None:

            if handicap < low_handicap:
                low_handicap = handicap
                return handicap, low_handicap

            # Assuming 'user' is the user for whom you want to find the latest handicap data date
            latest_handicap_data = HandicapData.objects.filter(user=user).latest('date_time_update')
            # Get the date of the latest handicap data
            latest_handicap_date = latest_handicap_data.date_time_update


            # Assuming 'low_handicap_date' is the date of the posted round
            start_date = latest_handicap_date - timedelta(days=365)
            end_date = latest_handicap_date
            
            #This date needs to be the last round prior to the one being posted today. 
            recent_handicaps = HandicapData.objects.filter(user=user, date_time_update__range=(start_date, end_date)).order_by('date_time_update')[:]

            # Check if there's only one recent handicap data entry
            if len(recent_handicaps) == 1:
                low_handicap = handicap

                return handicap, low_handicap


            increase = handicap - low_handicap
            if increase > 3.0:
                handicap = low_handicap + 3.0 + (increase - 3.0) * 0.5

            hard_cap = low_handicap + 5.0
            if handicap > hard_cap:
                handicap = hard_cap
            
            return handicap, low_handicap
        else:

            low_handicap = handicap

            return handicap, low_handicap
    else:

        low_handicap = handicap

        return handicap, low_handicap



#Updating a round after delete

def delete_round_update(user):
    # Find the most recent round
    most_recent_round = GolfRound.objects.filter(user=user).latest('date_time_played')

    # Determine the date of the most recent round
    most_recent_round_date = most_recent_round.date_time_played

    # Find the lowest handicap value within one year of the most recent round
    start_date = most_recent_round_date - timedelta(days=365)
    end_date = most_recent_round_date
    lowest_handicap_within_year = HandicapData.objects.filter(user=user, date_time_update__range=(start_date, end_date)).order_by('handicap')[:1].first().handicap

    # Get the most recent rounds played after the deleted round

    recent_rounds = GolfRound.objects.filter(user=user, date_time_played__gt=deleted_round_date).order_by('date_time_played')[:20]
    differentials = []

    for round in recent_rounds:
        differential = round.round_differential
        differentials.append(differential)

    differentials.sort()

    #If rounds less than 5, calculate with lowest 1 differential. 

    if len(differentials) < 4:
        best_differentials = differentials[:1]
        adjustment = -2
    
    if len(differentials) > 3 and len(differentials) < 5:
        best_differentials = differentials[:1]
        adjustment = -1

    if len(differentials) > 4 and len(differentials) < 6:
        best_differentials = differentials[:1]   
        adjustment = 0 

    #If 6 rounds calculate this way 
    if len(differentials) == 6:
        best_differentials = differentials[:2]
        adjustment = -1

    #If 7-8 rounds calculate this way 
    if len(differentials) > 6 and len(differentials) < 9:
        best_differentials = differentials[:2]
        adjustment = 0 

    #If 9-11 rounds calculate this way 
    if len(differentials) > 8 and len(differentials) < 12:
        best_differentials = differentials[:3]
        adjustment = 0 

    #if 12-14 rounds calculate this way 
    if len(differentials) > 11 and len(differentials) < 15:
        best_differentials = differentials[:4]
        adjustment = 0 

    #If 15-16 rounds calculate this way 
    if len(differentials) > 14 and len(differentials) < 17:
        best_differentials = differentials[:5]
        adjustment = 0 

    #if 17-18 rounds calculate this way 
    if len(differentials) > 16 and len(differentials) < 19:
        best_differentials = differentials[:6]
        adjustment = 0 

    #If 19 rounds, calc this way 
    if len(differentials) == 19:
        best_differentials = differentials[:7]
        adjustment = 0 

    #If 20 rounds, calc this way
    if len(differentials) >= 20:
        best_differentials = differentials[:8]
        adjustment = 0 

    handicap = (sum(best_differentials) / len(best_differentials) * 0.96) + adjustment


    low_handicap = lowest_handicap_within_year


    # Check if there are at least 20 rounds for the low handicap calculation
    if len(recent_rounds) >= 20:
        if low_handicap is not None:
            if handicap < low_handicap:
                low_handicap = handicap
                return handicap, low_handicap

            increase = handicap - low_handicap
            if increase > 3.0:
                handicap = low_handicap + 3.0 + (increase - 3.0) * 0.5

            hard_cap = low_handicap + 5.0
            if handicap > hard_cap:
                handicap = hard_cap

            return handicap, low_handicap
        else:
            low_handicap = handicap

            return handicap, low_handicap
    else:
        low_handicap = handicap

        return handicap, low_handicap
