from ninja import NinjaAPI, Schema, Field
from .models import Event
from pydantic.functional_validators import field_validator
from datetime import datetime

event_api = NinjaAPI(urls_namespace='event_api')

class EventIn(Schema):
    date: str = Field(..., description="Fecha del evento en formato dd/mm/yyyy")
    event: str = Field(..., min_length=5, max_length=80, description="Descripción del evento")
    time: str = Field(..., description="Hora del evento en formato HH:MM")
    location: str
    endTime: str
    stateEvent: str

@field_validator("date")
def validate_date(cls, v):
    try:
        datetime.strtime(v, "%d/%m/%Y")
    except ValueError:
        raise ValueError("Introduce una fecha válida.")
    return v
    
@field_validator("event")
def validate_event(cls, v):
    if not (5 <= len(v) <= 80):
        raise ValueError("El evento debe tener entre 5 y 60 caracteres.")
    
@field_validator("time")
def validate_time(cls, v):
    try: 
        datetime.strtime(v, "%H:%M")
    except ValueError:
        raise ValueError("Hora del evento no válida.")
    return v


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
