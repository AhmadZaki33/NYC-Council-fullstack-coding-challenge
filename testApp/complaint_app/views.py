from rest_framework import viewsets
from .models import Complaint
from .serializers import  ComplaintSerializer
from rest_framework.response import Response
from .views_helpers import mapUserDistrictToAccount
from django.db.models import Count
# Create your views here.

class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get all complaints from the user's district
    complaint_account = mapUserDistrictToAccount(request.user.id)
    view_queryset = Complaint.objects.filter(account = complaint_account)
    serializer = ComplaintSerializer(view_queryset, many=True)
    return Response(serializer.data)

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get only the open complaints from the user's district
    complaint_account = mapUserDistrictToAccount(request.user.id)
    view_queryset = Complaint.objects.filter(account = complaint_account, closedate__isnull=True)
    serializer = ComplaintSerializer(view_queryset, many=True)
    return Response(serializer.data)

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def list(self, request):
    # Get only complaints that are close from the user's district
    complaint_account = mapUserDistrictToAccount(request.user.id)
    view_queryset = Complaint.objects.filter(account = complaint_account, closedate__isnull=False)
    serializer = ComplaintSerializer(view_queryset, many=True)
    return Response(serializer.data)
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    complaint_account = mapUserDistrictToAccount(request.user.id)
    complaintsTypesCounts = Complaint.objects.filter(account = complaint_account) \
      .values('complaint_type') \
      .annotate(complaint_type_count = Count('complaint_type')) \
      .order_by('-complaint_type_count')
    topThreeComplaintTypes = complaintsTypesCounts[0:3]
    return Response(topThreeComplaintTypes)