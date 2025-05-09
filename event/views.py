from ninja import NinjaAPI, Schema, Field
from typing import Optional
from pydantic.functional_validators import field_validator
from datetime import datetime
from .models import Event

event_api = NinjaAPI(urls_namespace='event_api')

class EventIn(Schema):
    date: str = Field(..., description="Fecha del evento en formato dd/mm/yyyy")
    event: str = Field(..., min_length=5, max_length=80, description="Descripción del evento")
    time: str = Field(..., description="Hora del evento en formato HH:MM")
    location: str = Field(..., min_length=5, max_length=30, description="Lugar del evento")
    end_time: int = Field(..., gt=0, description="Duración del evento en minutos", alias="endTime")
    state_event: Optional[int] = Field(default=None, alias="stateEvent")

@field_validator("date")
def validate_date(cls, v):
    try:
        datetime.strtime(v, "%d/%m/%Y")
    except ValueError:
        raise ValueError("Introduce una fecha válida.")
    return v
    
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
    end_time: str = Field(alias="endTime")
    state_event: str = Field(alias="stateEvent")

class StateEventOut(Schema):
    id: int 
    label: str

@event_api.post("/")
def create_event(request, data: EventIn):
    event = Event.objects.create(
        date=data.date,
        event=data.event,
        time=data.time,
        location=data.location,
        end_time=data.end_time,
    )

    return {"ok": True}
