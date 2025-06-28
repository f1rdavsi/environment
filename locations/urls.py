# locations/urls.py

from django.urls import path
from . import views

urlpatterns = [
    # Главная страница с местами
    path('', views.index, name='index'),
    
    # Детальная страница места
    path('<int:pk>/', views.location_detail, name='location_detail'),
]