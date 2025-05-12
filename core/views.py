from django.shortcuts import render

# Create your views here.
def welcome(request):
    return render(request, 'WelcomePage.html')

def signup_view(request):
    return render(request, 'SignUp.html')

def signin_view(request):
    return render(request, 'SignIn.html')
