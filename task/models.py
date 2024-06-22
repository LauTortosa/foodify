from django.db import models

MAX_LENGTH = 50

class Task(models.Model):
    task = models.CharField(max_length=MAX_LENGTH)
    completed = models.BooleanField(default=False)

    def __str__(self): 
        return f"{self.task} ({self.completed})"