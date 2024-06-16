from ninja import NinjaAPI, Schema
from typing import List, Optional
from .models import Planning
from product.models import Product, ProductComponent
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
    component_value: Optional[List[str]] = None

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

@api.get("planning/{planning_id}", response=PlanningOut)
def get_planning(request, planning_id: int):
    planning = Planning.objects.get(id=planning_id)
    product = planning.product
    product_components = ProductComponent.objects.filter(product=product)
    component_values = [f"{pc.component.label} - {pc.kilograms} kg" for pc in product_components]
    planning.component_value = component_values

    return planning

