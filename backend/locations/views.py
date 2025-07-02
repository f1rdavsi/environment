# Create your views here.
from django.shortcuts import render, get_object_or_404
from .models import Location
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LocationSerializer

def location_detail(request, pk):
    location = get_object_or_404(Location, pk=pk)
    return render(request, 'locations/detail.html', {'location': location})

class LocationListAPIView(APIView):
    def get(self, request):
        locations = Location.objects.all()
        serializer = LocationSerializer(locations, many=True)
        return Response(serializer.data)