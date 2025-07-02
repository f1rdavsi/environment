from django.db import models

# Create your models here.

class TourismProduct(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.URLField()
    duration = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.URLField()
    date = models.DateField()
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.title
