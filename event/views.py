from ninja import NinjaAPI, Schema, Field
from typing import Optional, List
from pydantic.functional_validators import field_validator
from datetime import datetime
from .models import Event, StateEvent

event_api = NinjaAPI(urls_namespace='event_api')

class EventIn(Schema):
    date: str = Field(..., description="Fecha del evento en formato dd/mm/yyyy")
    event: str = Field(..., min_length=5, max_length=80, description="Descripción del evento")
    time: str = Field(..., description="Hora del evento en formato HH:MM")
    location: str = Field(..., min_length=5, max_length=30, description="Lugar del evento")
    end_time: int = Field(..., gt=0, description="Duración del evento en minutos", alias="endTime")
    state_event: Optional[int] = Field(default=1, alias="stateEvent")

@field_validator("date")
def validate_date(cls, v):
    try:
        datetime.strptime(v, "%d/%m/%Y")
    except ValueError:
        raise ValueError("Introduce una fecha válida.")
    return v
    
@field_validator("time")
def validate_time(cls, v):
    try: 
        datetime.strptime(v, "%H:%M")
    except ValueError:
        raise ValueError("Hora del evento no válida.")
    return v


class EventOut(Schema): 
    id: int
    date_value: str
    event: str
    time_value: str
    location: str
    end_time_value: Optional[str] = None
    state_event_value: Optional[str] = None

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

@event_api.get("/list", response=List[EventOut])
def list_event(request):
    list = Event.objects.all()

    return list

@event_api.get("/state", response=List[StateEventOut])
def get_state_event(request):
    states = StateEvent.objects.all()

    return states

@event_api.delete("/{event_id}")
def delete_event(request, event_id: int):
    event = Event.objects.get(id=event_id)
    event.delete()

    return {"ok": True}

@event_api.put("/{event_id}")
def update_event(request, event_id: int, data: EventIn):
    event = Event.objects.get(id=event_id)

    if data.date:
        event.date = data.date
    
    if data.event:
        event.event = data.event
    
    if data.time:
        event.time = data.time

    if data.location:
        event.location = data.location

    if data.end_time:
        event.end_time = data.end_time
    
    if data.state_event:
        new_state = StateEvent.objects.get(id=data.state_event)
        event.state_event = new_state

    event.save()

    return {
        "id": event.id,
        "date": event.date,
        "event": event.event,
        "time": event.time,
        "location": event.location,
        "end_time": event.end_time,
        "state_event": event.state_event.id
    }