from django.shortcuts import render, redirect
from .models import Task
from django.contrib.auth.models import User


def todo(request):

    if request.user.is_authenticated:
        tasks = Task.objects.order_by('-date_added').filter(user=request.user.id)

    context = {
        'tasks' : tasks
    }
    return render(request, 'todo/todo.html', context)


def add(request):

    if request.method == 'GET':
        data = request.GET['task']

        if request.user.is_authenticated:
            task = Task(user=request.user, description=data)        
            task.save()
            return redirect('todo')
            
    else:
        return render(request, 'todo/todo.html',)