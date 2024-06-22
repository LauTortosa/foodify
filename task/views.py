from ninja import Field, NinjaAPI, Schema
from typing import Annotated, List, Optional

from .models import Task

task_api = NinjaAPI(urls_namespace='task_api')

class TaskIn(Schema):
    task: Annotated[str, Field(min_length=3, strip_whitespace=True)]
    completed: Optional[str]

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

@task_api.put("/{task_id}")
def update_task(request, task_id: int, data: TaskIn):
    task = Task.objects.get(id=task_id)

    if data.task:
        task.task = data.task
    
    if data.completed:
        task.completed = data.completed

    task.save()

    return {
        "id": task.id,
        "task": task.task,
        "completed": task.completed
    }

@task_api.delete("/{task_id}")
def delete_task(request, task_id: int):
    task = Task.objects.get(id=task_id)
    task.delete()

    return {"ok": True}

