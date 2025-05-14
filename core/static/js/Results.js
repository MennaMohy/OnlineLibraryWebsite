document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const term = document.getElementById('searchInput').value.trim();

            fetch(`/search/?query=${encodeURIComponent(term)}`)
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('bookResults');
                    container.innerHTML = '';

                    if (data.length === 0) {
                        container.innerHTML = '<p>No books found. Try a different search.</p>';
                        return;
                    }

                    data.forEach(book => {
                        const bookDiv = document.createElement('div');
                        bookDiv.className = 'book-result';

                        bookDiv.innerHTML = `
                            <img src="${book.image}" alt="${book.title}" class="book-cover">
                            <h3>${book.title}</h3>
                            <p>By ${book.author}</p>
                            <p>Category: ${book.category}</p>
                            <p class="description">${book.description || ''}</p>
                            <p>Available: ${!book.borrowed ? 'Yes' : 'No'}</p>
                        `;
                        container.appendChild(bookDiv);
                    });
                })
                .catch(error => console.error('Error:', error));
        });
    }
});