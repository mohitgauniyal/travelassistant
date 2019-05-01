from django.shortcuts import render
from .models import Task


def todo(request):
    tasks = Task.objects.all()

    context = {
        'tasks' : tasks
    }
    return render(request, 'todo/todo.html', context)