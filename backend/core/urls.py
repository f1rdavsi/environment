from django.urls import path, include
from .views import TourismProductListAPIView, RegisterView, UserProfileView, EventListAPIView
from locations.views import LocationListAPIView

urlpatterns = [
    path('tourism-products/', TourismProductListAPIView.as_view(), name='tourism-product-list'),
    path('events/', EventListAPIView.as_view(), name='event-list'),
    path('location/', LocationListAPIView.as_view(), name='location-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
] 