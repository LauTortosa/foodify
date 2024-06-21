from django.urls import path
from .views import planning_api

urlpatterns = [
    path("api/", planning_api.urls),
]
