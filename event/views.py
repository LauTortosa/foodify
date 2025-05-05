from ninja import NinjaAPI, Schema, Field
from .models import Event
from pydantic.functional_validators import field_validator
from datetime import datetime

event_api = NinjaAPI(urls_namespace='event_api')

class EventIn(Schema):
    date: str = Field(..., description="Fecha del evento en formato dd/mm/yyyy")
    event: str = Field(..., min_length=5, max_length=80, description="Descripción del evento")
    time: str
    location: str
    endTime: str
    stateEvent: str

@field_validator("date")
def validate_date(cls, v):
    try:
        datetime.strtime(v, "%d/%m/%Y")
    except ValueError:
        raise ValueError("Introduce una fecha válida.")
    
@field_validator("event")
def validate_event(cls, v):
    if not (5 <= len(v) <= 80):
        raise ValueError("El evento debe tener entre 5 y 60 caracteres.")


class EventOut(Schema): 
    id: int
    date: str
    event: str
    time: str
    location: str
    endTime: str
    stateEvent: str

class StateEventOut(Schema):
    id: int 
    label: str
