from django import forms
from .models import Book

CATEGORY_CHOICES = [
    ("fiction", "Fiction"),
    ("non-fiction", "Non-Fiction"),
    ("dark-fiction", "Dark-Fiction"),
    ("science", "Science"),
    ("biography", "Biography"),
    ("classic literature", "Classic Literature"),
    ("fantasy", "Fantasy"),
    ("fairy tale", "Fairy Tale"),
    ("contemporary romance", "Contemporary Romance"),
    ("romantic comedy", "Romantic Comedy"),
    ("small town romance", "Small-Town Romance"),
    ("new adult romance", "New Adult Romance"),
    ("mystery", "Mystery"),
    ("thriller", "Thriller"),
    ("history", "History"),
    ("self-help", "Self-Help"),
    ("self-development", "Self-Development"),
    ("business&communication", "Business & Communication"),
]

class BookForm(forms.ModelForm):
    category = forms.ChoiceField(choices=CATEGORY_CHOICES, required=True)

    class Meta:
        model = Book
        fields = ['title', 'author', 'category', 'description', 'image']
