from django.db import models

MAX_LENGTH = 50

class StateEvent(models.Model):
    value = models.CharField(max_length=MAX_LENGTH)
    label = models.CharField(max_length=MAX_LENGTH)

    def __str__(self):
        return f"{self.label}"


class Event(models.Model):
    date = models.DateField()
    event = models.CharField(max_length=MAX_LENGTH)
    time = models.TimeField()
    location = models.CharField(max_length=MAX_LENGTH)
    end_time = models.IntegerField(null=True, blank=True)
    state_event = models.ForeignKey(StateEvent, on_delete=models.RESTRICT, default=1)

    def __str__(self):
        return f"({self.id}) {self.event} - {self.date}"
    
    @property
    def date_value(self):
        return self.date.strftime("%d/%m/%Y")
    
    @property
    def state_event_value(self):
        if self.state_event:
            return self.state_event.label
        return None
    
    @property
    def time_value(self):
        return self.time.strftime("%H:%M")
    
    @property
    def end_time_value(self):
        if self.end_time is None:
            return None
        h, m = divmod(self.end_time, 60)
        if m == 0:
            return f"{h} hora" + ("s" if h != 1 else "")
        elif h == 0:
            return f"{m} minutos" + ("s" if m != 1 else "")
        else: 
            return f"{h} horas" + ("s" if h != 1 else "") + f" y {m} minuto" + ("s" if m != 1 else "")
