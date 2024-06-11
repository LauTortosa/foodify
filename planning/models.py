from django.db import models
from product.models import Product

MAX_LENGTH = 30

class State(models.Model):
    value = models.CharField(max_length=MAX_LENGTH)
    label = models.CharField(max_length=MAX_LENGTH)

class Planning(models.Model):
    date = models.DateField()
    load = models.IntegerField()
    tracebility = models.IntegerField()
    state = models.ForeignKey(State, on_delete=models.RESTRICT)
    product = models.ForeignKey(Product, on_delete=models.RESTRICT)
