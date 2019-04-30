from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('realtime.urls')),
    path('todo/', include('todo.urls')),
    path('albums/', include('albums.urls')),
    path('admin/', admin.site.urls),
]
