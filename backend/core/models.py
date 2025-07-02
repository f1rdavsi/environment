from django.db import models

# Create your models here.

class TourismProduct(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField()
    image_url = models.URLField()
    duration = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=50)
    category = models.CharField(max_length=60, blank=True, null=True)

    def __str__(self):
        return self.title

class Event(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField()
    image_url = models.URLField()
    date = models.DateField()
    location = models.CharField(max_length=60)

    def __str__(self):
        return self.title
