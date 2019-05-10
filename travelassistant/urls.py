from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from core import views


urlpatterns = [
    path('', include('realtime.urls')),
    path('todo/', include('todo.urls')),
    path('albums/', include('albums.urls')),
    path('users/', include('users.urls')),
    path('social-auth/', include('social_django.urls', namespace="social")),
    path('admin/', admin.site.urls)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)