from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Album(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    cover = models.ImageField(upload_to='cover/', blank=True)
    album_date = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.title


class Photo(models.Model):    
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=True)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/')

    def __str__(self):
        return self.album.title