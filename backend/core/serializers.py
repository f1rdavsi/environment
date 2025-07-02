from rest_framework import serializers
from .models import TourismProduct, Event

class TourismProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourismProduct
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__' 