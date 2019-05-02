from django.shortcuts import render, redirect
from django.contrib import messages, auth
from django.contrib.auth.models import User


def register(request):
    if request.method == 'POST':
        # Get Form values
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        # Check if passwords match
        if password == password2:
            # Check username
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username is taken.')
                return redirect('register')
            else:
                if User.objects.filter(email=email).exists():
                    messages.error(request, 'Email is being used.')
                    return redirect('register')
                else:
                    user = User.objects.create_user(username=username, password=password,
                    first_name=first_name, last_name=last_name, email=email)

                    # Login after register
                    # auth.login(request, user)
                    # messages.success(request, 'You are now Logged in.')
                    # return redirect('index')

                    user.save()
                    messages.success(request, 'Registration successful. Please Login to continue.')
                    return redirect('login')

        else:   
            messages.error(request, 'Passwords do not match.')
            return redirect('register')
    else:
        return render(request, 'users/register.html')
    

def login(request):
    return render(request, 'users/login.html')



def logout(request):
    return redirect(request, 'index')