from django.shortcuts import render, redirect
from django.contrib import messages


def register(request):
    if request.method == 'POST':
        messages.error(request, 'Testing error message')
        return redirect('register')
    else:
        return render(request, 'users/register.html')
    

def login(request):
    return render(request, 'users/login.html')



def logout(request):
    return redirect(request, 'index')