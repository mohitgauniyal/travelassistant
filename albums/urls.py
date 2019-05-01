from django.urls import path
from . import views

urlpatterns = [
    path('', views.albums, name='albums'),
    #path('album/', views.album, name='album'),
    path('<int:album_id>', views.album, name='album'),
]
