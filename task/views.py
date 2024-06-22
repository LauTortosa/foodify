from ninja import NinjaAPI, Schema
from typing import List

from .models import Task

task_api = NinjaAPI(urls_namespace='task_api')

class TaskIn(Schema):
    task: str

class TaskOut(Schema):
    id: int
    task: str
    completed: bool

@task_api.post("/")
def create_task(request, data: TaskIn):
    task = Task.objects.create(task=data.task)
    task.save()

    return {"ok": True}

@task_api.get("/list", response=List[TaskOut])
def list_tasks(request):
    list = Task.objects.all()

    return list

@task_api.get("/{task_id}", response=TaskOut)
def get_task(request, task_id: int):
    task = Task.objects.get(id=task_id)
    description = task.task 
    completed = task.completed 

    return TaskOut(
        id=task.id,
        task=description,
        completed=completed
    )


