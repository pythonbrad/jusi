from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/home.html', {
            'title': 'Home'
        })

def about(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/about.html', {
            'title': 'About'
        })

@login_required
def dashboard(request):
    return render(request, 'dashboard/base.html', {
        'title': 'Jusi'
    })