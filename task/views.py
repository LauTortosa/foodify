from ninja import NinjaAPI, Schema
from typing import List

from .models import Task

task_api = NinjaAPI(urls_namespace='task_api')

class TaskIn(Schema):
    description: str

class TaskOut(Schema):
    id: int
    description: str
    completed: bool

@task_api.post("/")
def create_task(request, data: TaskIn):
    task = Task.objects.create(task=data.description)
    task.save()

    return {"ok": True}

@task_api.get("/{task_id}", response=TaskOut)
def get_task(request, task_id: int):
    task = Task.objects.get(id=task_id)
    description = task.task 
    completed = task.completed 

    return TaskOut(
        id=task.id,
        description=description,
        completed=completed
    )
