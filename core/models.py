from django.db import models

# Create Table User and save all the user's info
class User(models.Model):
    name = models.CharField(max_length=150)
    # Check if it is a valid email -> .EmailField and make sure it is unique
    email = models.EmailField(unique=True)
    # Saving it in 128 as it will be hashed
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=10, choices=[('admin','Admin'), ('user', 'User')])

    # Method to define the email as the representation of the user object
    def __str__(self):
        return self.email



class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='books_images/', default='default.jpg')
    is_borrowed = models.BooleanField(default=False)
    borrowed_by = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.title