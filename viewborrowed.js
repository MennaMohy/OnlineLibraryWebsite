// view the borrowed books
const books = JSON.parse(localStorage.getItem('books')) || [];

document.addEventListener('DOMContentLoaded', function () {

    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    const container = document.getElementById('borrowedbooks');

    // the user didn't borrow any book
    if (borrowedBooks.length === 0) {
        container.innerHTML = '<p style="text-align: center;">You haven’t borrowed any books yet.</p>';
        return;
    }

    // for each borrowed book, display its detail
    borrowedBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-result');

        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Category:</strong> ${book.category}</p>
            </div>
            <div class="book-status">
                <span class="availability unavailable">Due ${getDueDate()}</span>
            </div>
        `;

        container.appendChild(bookElement);
    });

    // setting the due date that the user should return the book
    function getDueDate() {
        const due = new Date();
        due.setDate(due.getDate() + 14); // it will be due in 14 days from the borrowed date
        return due.toLocaleDateString('en-GB'); // e.g. "18/05/2025"
    }
});