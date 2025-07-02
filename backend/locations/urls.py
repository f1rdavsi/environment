# locations/urls.py

from django.urls import path
from .views import LocationListAPIView, location_detail

urlpatterns = [
    # path('', views.index, name='index'),  # Удалено, чтобы не было ошибки
    
    # Детальная страница места
    path('api/locations/', LocationListAPIView.as_view(), name='location-list'),
    path('<int:pk>/', location_detail, name='location_detail'),
]