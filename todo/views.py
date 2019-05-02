from django.shortcuts import render
from .models import Task
from django.contrib.auth.models import User

def todo(request):

    if request.user.is_authenticated:
        tasks = Task.objects.filter(user=request.user.id)

    context = {
        'tasks' : tasks
    }
    return render(request, 'todo/todo.html', context)