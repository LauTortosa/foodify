from django.db import models

MAX_LENGTH = 30

class Type(models.Model):
    value = models.CharField(max_length=MAX_LENGTH)
    label = models.CharField(max_length=MAX_LENGTH)

class Product(models.Model):
    product = models.CharField(max_length=MAX_LENGTH)
    type = models.ForeignKey(Type, on_delete=models.RESTRICT, null=True, blank=True)

class Component(models.Model):
    value = models.CharField(max_length=MAX_LENGTH)
    label = models.CharField(max_length=MAX_LENGTH)

class ProductComponent(models.Model):
    product = models.ForeignKey(Product, on_delete=models.RESTRICT)
    component = models.ForeignKey(Component, on_delete=models.RESTRICT)
    kilograms = models.DecimalField(max_digits=5, decimal_places=2)