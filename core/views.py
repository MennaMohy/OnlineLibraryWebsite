from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User,Book
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from django.contrib.auth.hashers import check_password
import random
import string
from .models import Book
from django.views.decorators.http import require_POST
from .forms import BookForm
# views
def welcome(request):
    return render(request, 'WelcomePage.html')
def signup_page(request):
    return render(request, 'SignUp.html')
def admin_homepage(request):
    user_role = request.session.get('role')
    return render(request, 'Admin_Homepage.html', {'user_role': user_role})

def user_homepage(request):
    user_role = request.session.get('role')
    return render(request, 'UserHomePage.html', { 'user_role': user_role})

def signin_view(request):
    return render(request, 'SignIn.html')

def forgot_password_page(request):
    return render(request, 'ForgotPassword.html')

def manage_books(request):
    books = Book.objects.all()

    user_role = None

    if 'email' in request.session:
        try:
            user = User.objects.get(email=request.session['email'])
            user_role = user.role
        except User.DoesNotExist:
            pass  # Keep default 'guest' role if user not found

    return render(request, 'Manage_books.html', {
        'books': books,
        'user_role': user_role,
    })

def add_book(request):
    user_role = request.session.get('role')  # Get role from session

    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('manage_books')
    else:
        form = BookForm()

    return render(request, 'Admin_AddBook.html', {
        'form': form,
        'user_role': user_role,
    })

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
        # Store user's data in the session
        request.session['username'] = user.name
        request.session['email'] = user.email
        request.session['role'] = user.role
        # If the user exists and enters data correctly
        return JsonResponse({"message":"Login successful", "role":user.role}, status = 200)

@csrf_exempt
def forgot_password_submit(request):
    if request.method == "POST":
        # Get the email that the user has entered
        data = json.loads(request.body)
        email = data.get("email")

        # Get the user with this email
        user = User.objects.filter(email=email).first()

        # If no user found: error! can't change password
        if not user:
            return JsonResponse({"error": "No user with this email!"}, status=400)

        # Save all the letters and digits to generate a random password
        characters = string.ascii_letters + string.digits
        # Generate an 8-characters random password
        new_password = ''.join(random.choices(characters, k=8))

        # Encrypt the new password then save it
        user.password = make_password(new_password)
        user.save()

        # Return the password to show it to the user
        return JsonResponse({
            "message": f"Your password has been reset to: {new_password}"}, status=200)


def results_page(request):
    query = request.GET.get('query', '')
    books = Book.objects.filter(
        title__icontains=query
    ) | Book.objects.filter(
        author__icontains=query
    ) | Book.objects.filter(
        category__icontains=query
    )
    user_role = request.session.get('role', None)
    print(f"User role from session: {user_role}")
    print(f"Query: {query}")
    print(f"Books found: {list(books.values())}")

    context = {
        'books': books,
        'query': query,
        'user_role': user_role
    }
    return render(request, 'Results.html', context)

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
def edit_books(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    user_role = request.session.get('role')  # get role from session

    if request.method == 'POST':
        book.title = request.POST['title']
        book.author = request.POST['author']
        book.category = request.POST['category']
        book.description = request.POST['description']
        if 'image' in request.FILES:
            book.image = request.FILES['image']
        book.save()
        return redirect('manage_books')

    return render(request, 'editBook.html', {
        'book': book,
        'user_role': user_role  # pass role to template
    })

@require_POST
def delete_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    book.delete()
    return redirect('manage_books')
# display book details when the user presses on a specific book
def book_detail(request, book_id):
    # Get the book from the database by its ID
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'book_detail.html', {'book': book})

# user goes to homepage
def user_homepage(request):
    books = Book.objects.all()
    return render(request, 'UserHomePage.html', {'books': books})

@csrf_exempt
def borrow_book(request, book_id):
    if request.method == 'POST':
        email = request.session.get('email')

        if not email:
            return JsonResponse({'success': False, 'message': 'User not logged in'}, status=401)

        book = get_object_or_404(Book, id=book_id)

        if book.is_borrowed:
            return JsonResponse({'success': False, 'message': 'Book is already borrowed'})

        book.is_borrowed = True
        book.borrowed_by = email
        book.save()

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)

def borrowed_books(request):
    email = request.session.get('email')
    if not email:
        return redirect('signin')

    borrowed_books = Book.objects.filter(is_borrowed=True, borrowed_by=email)

    return render(request, 'viewBorrowed.html', {
        'borrowed_books': borrowed_books
    })

# view available books that aren't borrowed
def available_books(request):
    # Fetch books that are available
    books = Book.objects.filter(is_borrowed=False)
    user_role = request.session.get('role')
    return render(request, 'viewAvailable.html', {
        'books': books,
        'user_role': user_role
    })

# user presses log out in the navigation bar
def logout_view(request):
    from django.contrib.auth import logout
    logout(request)
    return redirect('welcome')

# navigation bar
def user_home(request):
    # getting the role from the User model to know admin or user
    user_role = request.user.role
    context = {'user_role': user_role}
    return render(request, 'UserHomePage.html', context)

# about us page in the navigation bar
def about_us(request):
    user_role = request.session.get('role')
    return render(request, 'aboutUs.html', {'user_role': user_role})

