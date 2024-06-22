from django.urls import path
from .views import task_api

urlpatterns = [
    path("api/", task_api.urls),
]
