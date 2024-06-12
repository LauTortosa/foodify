from .models import State
from .constants import STATE_CHOICES 

def populate_options(apps, schema):
    State = apps.get_model("planning", "State")
    
    for option in STATE_CHOICES:
        obj, _ = State.objects.get_or_create(value = option[0])  
        obj.label = option[1]
        obj.save()