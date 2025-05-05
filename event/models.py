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
    endTime = models.CharField(max_length=MAX_LENGTH)
    stateEvent = models.ForeignKey(StateEvent, on_delete=models.RESTRICT, default=1)

    def __str__(self):
        return f"({self.id}) {self.event} - {self.date}"
    
    @property
    def date_value(self):
        return self.date.strftime("%d/%m/%Y")
    
    @property
    def stateEvent_value(self):
        return self.stateEvent.label
    
    @property
    def time_value(self):
        return self.time.strftime("%H:%M")
