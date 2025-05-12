# core/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name='welcome'),
    path('signup/', views.signup_page, name='signup'),
    path('signup/submit/', views.signup_view, name='signup_submit'),
    path('signin/', views.signin_view, name='signin'),
    path('admin-home/', views.admin_homepage, name='admin_home'),
    path('user-home/', views.user_homepage, name='user_home'),
]

