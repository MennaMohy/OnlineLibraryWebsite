# core/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name='welcome'),
    path('signup/', views.signup_page, name='signup'),
    path('signup/submit/', views.signup_view, name='signup_submit'),
    path('signin/', views.signin_view, name='signin'),
    path('admin-home/', views.admin_homepage, name='admin_home'),
    path('admin-home/manage-books/', views.manage_books, name='manage_books'),
    path('user-home/', views.user_homepage, name='user_home'),
    path('search/', views.search_books, name='search_books'),# core/urls.py
    path('results/', views.results_page, name='results_page'),

]

