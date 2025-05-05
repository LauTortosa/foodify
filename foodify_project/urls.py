from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenido a la página principal.")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('product/', include('product.urls')),
    path('planning/', include('planning.urls')),
    path('task/', include('task.urls')),
    path('event/', include('event.urls')),
]