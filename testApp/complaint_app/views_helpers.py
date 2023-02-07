from .models import UserProfile

def mapUserDistrictToAccount(userId):
  user_profile = UserProfile.objects.get(pk=userId)
  user_district = user_profile.district
  return f'NYCC{int(user_district):02}'