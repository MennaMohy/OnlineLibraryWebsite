from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User,Book
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from django.contrib.auth.hashers import check_password


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

def manage_books(request):
    # Logic for managing books
    return render(request, 'Manage_books.html')


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
        request.session['user_role'] = role
        return JsonResponse({"message": "User created successfully"}, status=201)

def results_page(request):
    query = request.GET.get('query', '')
    books = Book.objects.filter(
        title__icontains=query
    ) | Book.objects.filter(
        author__icontains=query
    ) | Book.objects.filter(
        category__icontains=query
    )
    user_role = request.session.get('user_role', None)
    print(f"User role from session: {user_role}")

    context = {
        'books': books,
        'query': query,
        'user_role': user_role
    }
    return render(request, 'Results.html', context)

@csrf_exempt
def signin_submit(request):
    if request.method == "POST":
        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        # Get the first user that has this email
        user = User.objects.filter(email=email).first()

        # If user didn't sign in yet
        if not user:
            return JsonResponse({"error": "User not found! Please sign-up first"}, status=400)
        # If the user enters wrong password
        if not check_password(password,user.password):
            return JsonResponse({"error": "Incorrect password!"}, status=400)
        # If the user exists and enters data correctly
        return JsonResponse({"message":"Login successful", "role":user.role}, status = 200)


@csrf_exempt
def search_books(request):
    term = request.GET.get('query', '').lower()

    # Use Q objects to combine queries for title, author, and category
    books = Book.objects.filter(
        Q(title__icontains=term) |
        Q(author__icontains=term) |
        Q(category__icontains=term)
    )

    result = []
    for book in books:
        result.append({
            'title': book.title,
            'author': book.author,
            'category': book.category,
            'description': book.description,
            'image': book.image.url,
            'borrowed': book.is_borrowed
        })

    return JsonResponse(result, safe=False)