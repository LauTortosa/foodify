from django.db import models

MAX_LENGTH = 30

class Type(models.Model):
    value = models.CharField(max_length=MAX_LENGTH)
    label = models.CharField(max_length=MAX_LENGTH)

class Product(models.Model):
    product = models.CharField(max_length=MAX_LENGTH)
    type = models.ForeignKey(Type, on_delete=models.RESTRICT)