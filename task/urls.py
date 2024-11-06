from django.urls import path
from .views import task_api

urlpatterns = [
    path("task/api/", task_api.urls),
]
