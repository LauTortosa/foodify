from ninja import NinjaAPI, Schema
from typing import List
from .models import Planning
from product.models import Product
from datetime import date

api = NinjaAPI()

class PlanningIn(Schema):
    date: str
    load: int
    tracebility: int
    product: str

class PlanningOut(Schema):
    id: int
    date_value: str
    load: int
    tracebility: int
    state_value: str
    product_value: str

@api.post("/planning")
def create_planning(request, data: PlanningIn):
    planning = Planning.objects.create(date=data.date, load=data.load, tracebility=data.tracebility)
    planning.product = Product.objects.get(product=data.product)
    planning.save()

    return {"ok": True}

@api.get("planning/list", response=List[PlanningOut])
def list_plannning(request):
    list = Planning.objects.all()

    return list

@api.get("planning/registered", response=List[PlanningOut])
def list_registered(request):
    planning_registered = Planning.objects.filter(state=3)

    return planning_registered

