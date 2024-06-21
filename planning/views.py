from ninja import Field, NinjaAPI, Schema
from typing import Annotated, List, Optional

from pydantic import validator

from .models import Planning, State
from product.models import Product, ProductComponent
from datetime import date, timedelta

api = NinjaAPI()

class PlanningIn(Schema):
    date: str
    load: Annotated[int, Field(strict=True, gt=0)]
    tracebility: Annotated[int, Field(strict=True, gt=0)]
    product: Annotated[str, Field(min_length=1)]
    state_value: Optional[str] = Field(None, min_length=1)

    @validator('date')
    def validate_date(cls, v): 
     if isinstance(v, str):
            v = date.fromisoformat(v)
     if v <= (date.today() - timedelta(days=7)):
            raise ValueError("La fecha debe ser posterior a la que era hace una semana")
     return v
    
class PlanningOut(Schema):
    id: int
    date_value: str
    load: int
    tracebility: int
    state_value: str
    product_value: str
    component_value: Optional[List[str]] = None

class StateOut(Schema):
    id: int
    label: str


@api.post("/")
def create_planning(request, data: PlanningIn):
    planning = Planning.objects.create(date=data.date, load=data.load, tracebility=data.tracebility)
    planning.product = Product.objects.get(product=data.product)
    planning.save()

    return {"ok": True}

@api.get("/list", response=List[PlanningOut])
def list_plannning(request):
    list = Planning.objects.all()

    return list

@api.get("/registered", response=List[PlanningOut])
def list_registered(request):
    planning_registered = Planning.objects.filter(state=3)

    return planning_registered

@api.get("/{planning_id}", response=PlanningOut)
def get_planning(request, planning_id: int):
    planning = Planning.objects.get(id=planning_id)
    product = planning.product
    product_components = ProductComponent.objects.filter(product=product)
    component_values = [f"{pc.component.label} - {pc.kilograms} kg" for pc in product_components]
    planning.component_value = component_values

    return planning

@api.get("/state", response=List[StateOut])
def get_state(request):
    state = State.objects.all()

    return state

@api.get("/state/pending")
def get_state_pending(request):
    pending = Planning.objects.filter(state_id=1).count()

    return {"planning pending": pending} 

@api.delete("/{planning_id}")
def delete_planning(request, planning_id: int):
    planning = Planning.objects.get(id=planning_id)
    planning.delete()

    return {"ok": True}

@api.put("/{planning_id}")
def update_planning(request, planning_id: int, data: PlanningIn):
    planning = Planning.objects.get(id=planning_id)

    if data.date:
        planning.date = data.date

    if data.load:
        planning.load = data.load

    if data.tracebility:
        planning.tracebility = data.tracebility

    if data.state_value:
        new_state = State.objects.get(label=data.state_value)
        planning.state = new_state

    if data.product:
       new_product = Product.objects.get(product=data.product)
       planning.product = new_product
    
    planning.save()

    return {
        "id": planning.id,
        "date": planning.date,
        "load": planning.load,
        "tracebility": planning.tracebility,
        "state_value": planning.state.label,
        "product": planning.product.product
    }


    
