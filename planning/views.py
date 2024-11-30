from ninja import Field, NinjaAPI, Schema
from ninja.errors import HttpError
from typing import List, Optional
from pydantic.functional_validators import field_validator
from datetime import date, timedelta

from .models import Planning, State
from product.models import Product, ProductComponent

planning_api = NinjaAPI(urls_namespace='planning_api')

class PlanningIn(Schema):
    date: str = Field(...)
    load: int = Field(...)
    tracebility: int = Field(...)
    product: str = Field(..., min_length=1)

    @field_validator("date")
    def validate_date(cls, v):
        try:
            parsed_date = date.fromisoformat(v)  
        except ValueError:
            raise ValueError("introduce una fecha válida")

        if parsed_date <= (date.today() - timedelta(days=30)):
            raise ValueError("la fecha debe ser posterior a hace 30 días")
        return parsed_date
    
    @field_validator("load", mode="before")
    def validate_load(cls, v):
        if v is None:
            raise ValueError("introduce el número de cargas")
        if v <= 0: 
           raise ValueError("el numero de cargas tiene que ser mayor que 0")
        return v
    
    @field_validator("tracebility", mode="before")
    def validate_tracebility(cls, v):
        if v is None: 
            raise ValueError("introduce el número de trazabilidad")
        if v <= 0:
            raise ValueError("el número de trazabilidad tiene que ser mayor que 0")
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

@planning_api.post("/")
def create_planning(request, data: PlanningIn):
    print("received data:", data)

    if Planning.objects.filter(tracebility=data.tracebility).exists():
        raise HttpError(409, "Tracebility already exists for this planning")

    planning = Planning.objects.create(
        date=data.date, 
        load=data.load,
        tracebility=data.tracebility,
        product = Product.objects.get(product=data.product)
    )

    return {"ok": True}

@planning_api.get("/list", response=List[PlanningOut])
def list_plannning(request):
    list = Planning.objects.all()

    return list

@planning_api.get("/registered", response=List[PlanningOut])
def list_registered(request):
    planning_registered = Planning.objects.filter(state=3)

    return planning_registered

@planning_api.get("/{planning_id}", response=PlanningOut)
def get_planning(request, planning_id: int):
    planning = Planning.objects.get(id=planning_id)
    product = planning.product
    product_components = ProductComponent.objects.filter(product=product)
    component_values = [f"{pc.component.label} - {pc.kilograms} kg" for pc in product_components]
    planning.component_value = component_values

    return planning

@planning_api.get("/state", response=List[StateOut])
def get_state(request):
    state = State.objects.all()

    return state

@planning_api.get("/state/pending")
def get_state_pending(request):
    pending = Planning.objects.filter(state_id=1).count()

    return {"planning pending": pending}

@planning_api.get("/state/prepared")
def get_state_prepared(request):
    prepared = Planning.objects.filter(state_id=2).count()

    return {"planning prepared": prepared}  

@planning_api.delete("/{planning_id}")
def delete_planning(request, planning_id: int):
    planning = Planning.objects.get(id=planning_id)
    planning.delete()

    return {"ok": True}

@planning_api.put("/{planning_id}")
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


    
