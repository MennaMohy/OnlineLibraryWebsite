from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User
from django.contrib.auth.hashers import make_password



# Create your views here.
def welcome(request):
    return render(request, 'WelcomePage.html')
def signup_page(request):
    return render(request, 'SignUp.html')
def admin_homepage(request):
    return render(request, 'Admin_Homepage.html')
def user_homepage(request):
    return render(request, 'UserHomePage.html')

def signin_view(request):
    return render(request, 'SignIn.html')

# Define a function that accepts POST request
@csrf_exempt
def signup_view(request):
    if request.method == "POST":
        # Convert data from JSON to dictionary
        data = json.loads(request.body)

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role")

        if User.objects.filter(email=email).exists():
            return JsonResponse({"error" : "Email is already taken! "}, status=400)

        # Add the new user to the database
        # Make sure to encrypt the password
        User.objects.create(name=name, email=email, password=make_password(password), role=role)

        return JsonResponse({"message": "User created successfully"}, status=201)