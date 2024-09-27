from django.urls import path
from .views import users_api

urlpatterns = [
    path("api/", users_api.urls),
]
