from .models import StateEvent
from .constants import STATE_CHOICES

def populate_options(apps, schema):
    StateEvent = apps.get_model("event", "StateEvent")

    for option in STATE_CHOICES:
        obj, _ = StateEvent.objects.get_or_create(value = option[0])
        obj.label = option[1]
        obj.save()

