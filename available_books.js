// available books
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('booksContainer');

    // Load books from localStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];

    // Filter to only show available books that aren't borrowed
    const availableBooks = books.filter(book => {
        // Make sure book has all required properties and isn't borrowed
        return book && !book.borrowed && book.title && book.author && book.category;
    });

    // Clear container
    container.innerHTML = '';

    // all the books are borrowed
    if (availableBooks.length === 0) {
        container.innerHTML = '<p class="no-books">No available books found</p>';
        return;
    }

    // Display available books in a grid
    availableBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'admin-book-card';

        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-cover">
            <div class="admin-book-info">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Category:</strong> ${book.category}</p>
            </div>
        `;

        container.appendChild(bookCard);
    });
});