from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('product/', include('product.urls')),
    path('planning/', include('planning.urls')),
    path('task/', include('task.urls')),
]