
document.addEventListener('DOMContentLoaded', function(e) {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

    // Get search parameters
    // Get search values
    const searchTerm = sessionStorage.getItem('searchTerm').toLowerCase();
    const searchType = sessionStorage.getItem('searchType');

    // Filter books based on search
    let results = [];

    if (searchType === "title") {
        results = storedBooks.filter(book => book.title.toLowerCase().includes(searchTerm));
    }
    else if (searchType === "author") {
        results = storedBooks.filter(book => book.author.toLowerCase().includes(searchTerm));
    }
    else if (searchType === "category") {
        results = storedBooks.filter(book => book.category.toLowerCase().includes(searchTerm));
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

            const statusText = book.borrowed ? `Due ${book.dueDate || new Date().toLocaleDateString()}` : 'Available';
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
