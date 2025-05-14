from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User,Book
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from django.contrib.auth.hashers import check_password


# views
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
    print(f"Query: {query}")
    print(f"Books found: {list(books.values())}")

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

# display book details when the user presses on a specific book
def book_detail(request, book_id):
    # Get the book from the database by its ID
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'book_detail.html', {'book': book})

# user goes to homepage
def user_homepage(request):
    books = Book.objects.all()
    return render(request, 'UserHomePage.html', {'books': books})

# user wants to borrow a book
def borrow_book(request, book_id):
    if request.method == 'POST':
        book = get_object_or_404(Book, id=book_id)

        # book is borrowed so can't borrow it
        if book.is_borrowed:
            return JsonResponse({'success': False, 'message': 'Book is already borrowed'})

        # Get users name to store the book with his username
        data = json.loads(request.body)
        user = data.get('user')

        # changing the is borrowed flag of the book to true
        book.is_borrowed = True
        book.borrowed_by = user
        book.save() # save the updates in the database
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})

# view borrowed books
def borrowed_books(request):
    username = request.user.username
    # Get the books borrowed by the user
    borrowed_books = Book.objects.filter(is_borrowed=True, borrowed_by=username)

    borrowed_books_data = [{
        'title': book.title,
        'author': book.author,
        'category': book.category,
        'image': book.image.url if book.image else None  # Handle missing images
    } for book in borrowed_books]

    return render(request, 'viewBorrowed.html', {
        'borrowed_books_json': json.dumps(borrowed_books_data),
    })

# view available books that aren't borrowed
def available_books(request):
    # Fetch books that are available
    books = Book.objects.filter(is_borrowed=False)

    return render(request, 'viewAvailable.html', {
        'books': books
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
    return render(request, 'aboutUs.html')