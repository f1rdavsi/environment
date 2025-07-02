from django.db import models

# Create your models here.

class Location(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField()
    image_url = models.URLField()
    region = models.CharField(max_length=60)

    def __str__(self):
        return self.title
