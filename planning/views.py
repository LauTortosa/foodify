from ninja import NinjaAPI, Schema
from typing import Optional
from .models import Planning
from product.models import Product
from datetime import date

api = NinjaAPI()

class PlanningIn(Schema):
    date: str
    load: int
    tracebility: int
    product: str

@api.post("/planning")
def create_planning(request, data: PlanningIn):
    planning = Planning.objects.create(date=data.date, load=data.load, tracebility=data.tracebility)
    planning.product = Product.objects.get(product=data.product)
    planning.save()

    return {"ok": True}

@api.get("/items")
def list_items(request):
    return [{"id": 1, "name": "carbonara"}, {"id": 2, "name": "boloñesa"}]
