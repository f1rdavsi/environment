from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TourismProduct, Event
from .serializers import TourismProductSerializer, EventSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db import models
from users.models import UserProfile
from rest_framework.generics import RetrieveAPIView

# Create your views here.

class TourismProductListAPIView(APIView):
    def get(self, request):
        products = TourismProduct.objects.all()
        serializer = TourismProductSerializer(products, many=True)
        return Response(serializer.data)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        phone = request.data.get('phone')
        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name or '',
            last_name=last_name or ''
        )
        UserProfile.objects.create(user=user, phone=phone or '')
        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'first_name': user.first_name,
            'email': user.email,
        })

class EventListAPIView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
