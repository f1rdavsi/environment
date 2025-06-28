# Create your views here.
from django.shortcuts import render, get_object_or_404
from .models import Location

def location_detail(request, pk):
    location = get_object_or_404(Location, pk=pk)
    return render(request, 'locations/detail.html', {'location': location})