from django.db import models
from product.models import Product

MAX_LENGTH = 30

class State(models.Model):
    value = models.CharField(max_length=MAX_LENGTH)
    label = models.CharField(max_length=MAX_LENGTH)

    def __str__(self):
        return f"({self.label})"

class Planning(models.Model):
    date = models.DateField()
    load = models.IntegerField()
    tracebility = models.IntegerField()
    state = models.ForeignKey(State, on_delete=models.RESTRICT, null=True, default=1)
    product = models.ForeignKey(Product, on_delete=models.RESTRICT, null=True)

    def __str__(self):
        return f"({self.id}) {self.product} {self.state}"
    
    @property
    def date_value(self):
        return self.date.strftime("%d/%m/%Y")
    
    @property
    def state_value(self):
        return self.state.label
    
    @property
    def product_value(self):
        return self.product.product
    
   
