from django.urls import path
from . import views

urlpatterns = [
    path('', views.todo, name='todo'),
    path('add/', views.add, name='addtask'),
    path('delete/', views.delete, name='deletetask'),
]