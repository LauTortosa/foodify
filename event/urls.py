from django.urls import path
from .views import event_api

urlpatterns = [
    path("api/", event_api.urls),
]