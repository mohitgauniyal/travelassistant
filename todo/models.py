from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    date_added = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.user.username
