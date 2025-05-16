# core/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name='welcome'),
    path('welcome/', views.welcome, name='welcome'),

    path('signup/', views.signup_page, name='signup'),
    path('signup/submit/', views.signup_view, name='signup_submit'),

    path('signin/', views.signin_view, name='signin'),
    path('signin/submit/', views.signin_submit, name='signin_submit'),

    path('forgot-password/', views.forgot_password_page, name='forgot_password_page'),
    path('forgot-password/submit/', views.forgot_password_submit, name='forgot_password_submit'),

    path('admin-home/', views.admin_homepage, name='admin_home'),

    path('admin-home/manage-books/', views.manage_books, name='manage_books'),

    path('manage-books/add-book/', views.add_book, name='add_book'),

    path('add-book/manage-books/', views.manage_books, name='manage_books'),

    path('user-home/', views.user_homepage, name='user_home'),
    path('search/', views.search_books, name='search_books'),
    path('results/', views.results_page, name='results_page'),

    path('admin-home/manage-books/edit/<int:book_id>/', views.edit_books, name='edit_books'),

    path('admin-home/manage-books/delete/<int:book_id>/', views.delete_book, name='delete_book'),

    path('admin-home/manage-books/edit/<int:book_id>/manage-books' , views.manage_books, name='manage_books'),

    # View available books (list of books that are not borrowed)
    path('available-books/', views.available_books, name='available_books'),

    # View details of a single book
    path('book/<int:book_id>/', views.book_detail, name='book_detail'),

    # View borrowed books (books borrowed by the logged-in user)
    path('borrowed-books/', views.borrowed_books, name='borrowed_books'),

    # user borrows a book
    path('borrow-book/<int:book_id>/', views.borrow_book, name='borrow_book'),

    # home page
    path('home/', views.user_homepage, name='user_homepage'),

    # about us page in navigation bar
    path('about-us/', views.about_us, name='aboutUs'),


]