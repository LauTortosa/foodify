from ninja import NinjaAPI, Schema
from typing import List

from .models import Task

task_api = NinjaAPI(urls_namespace='task_api')

class TaskIn(Schema):
    task: str

@task_api.post("/")
def create_task(request, data: TaskIn):
    task = Task.objects.create(task=data.task)
    task.save()

    return {"ok": True}