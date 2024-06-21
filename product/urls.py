from django.urls import path
from .views import product_api

urlpatterns = [
    path("api/", product_api.urls),
]

