document.addEventListener('DOMContentLoaded', function() {
    // Get index from query string
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get('index'));

    // Load books from localStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];

    // Check if index is valid
    if (isNaN(index) || index < 0 || index >= books.length) {
        alert('Invalid book selection!');
        window.location.href = 'manage_books.html';
        return;
    }

    const originalBook = books[index];

    // Prefill form with existing data
    document.getElementById('title').value = originalBook.title || '';
    document.getElementById('author').value = originalBook.author || '';
    document.getElementById('category').value = originalBook.category || '';
    document.getElementById('image').value = originalBook.image || '';
    document.getElementById('available').value = originalBook.available ? 'true' : 'false';

    // Save edits
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();

        popBox("Are you sure you want to save changes?", function () {
            const updatedBook = {
                ...originalBook,
                title: document.getElementById('title').value || originalBook.title,
                author: document.getElementById('author').value || originalBook.author,
                category: document.getElementById('category').value || originalBook.category,
                image: document.getElementById('image').value || originalBook.image,
                available: document.getElementById('available').value === 'true'
            };

            // Update the book in the array
            books[index] = updatedBook;

            // Save to localStorage
            localStorage.setItem('books', JSON.stringify(books));
            // Save the success flag to sessionStorage
            sessionStorage.setItem('bookUpdated', 'true');

            // Show success message and redirect
            window.location.href = 'manage_books.html';
        });
    });
});