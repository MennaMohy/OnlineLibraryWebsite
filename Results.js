document.addEventListener('DOMContentLoaded', function(e) {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

    // Get search term
    const searchTerm = (sessionStorage.getItem('searchTerm') || '').toLowerCase();

    // Filter books by title, author, or category
    const results = storedBooks.filter(book => {
        return (
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.category.toLowerCase().includes(searchTerm)
        );
    });
    function getDueDate() {
        const due = new Date();
        due.setDate(due.getDate() + 14); // it will be due in 14 days from the borrowed date
        return due.toLocaleDateString('en-GB'); // e.g. "18/05/2025"
    }
    // Display results
    const container = document.querySelector('.book-results-container');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p>No books found. Try a different search.</p>';
    } else {
        results.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book-result';

            const statusClass = book.borrowed ? 'unavailable' : 'available';
            const statusText = book.borrowed ? `Due ${getDueDate()}` : 'Available';
            const imagePath = book.image.startsWith('http')
                ? book.image
                : `${window.location.origin}/Books/${book.image.split('/').pop()}`;

            bookDiv.innerHTML = `
                <img src="${imagePath}" alt="${book.title}" class="book-cover">
                <div class="book-info">
                    <p><strong>Title:</strong> ${book.title}</p>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Category:</strong> ${book.category}</p>
                    <p class="book-description">${book.description}</p>
                </div>
                <div class="book-status">
                    <span class="availability ${statusClass}">${statusText}</span>
                </div>
            `;
            container.appendChild(bookDiv);
        });
    }
});
