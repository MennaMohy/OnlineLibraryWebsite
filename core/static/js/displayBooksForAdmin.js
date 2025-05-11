// Function to load books from localStorage and render them
function displayBooks() {
    const booksContainer = document.getElementById('booksContainer');
    booksContainer.innerHTML = ''; // Clear existing content

    let books = JSON.parse(localStorage.getItem('books')) || [];

    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'admin-book-card';
        bookCard.innerHTML = `
               <div class="book-actions">
                   <button class="edit-btn" onclick="editBook(${index})">Edit</button>
                   <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
               </div>
               <img src="${book.image}" alt="${book.title}" style="width:100px; height:auto;">
               <div class="admin-book-info">
                   <h3>${book.title}</h3>
                   <p><strong>Author:</strong> ${book.author}</p>
                   <p><strong>Category:</strong> ${book.category}</p>
                   <span class="availability ${book.available ? 'available' : 'unavailable'}">
                       ${book.available ? 'Available' : 'Unavailable'}
                   </span>
               </div>
        `;
        booksContainer.appendChild(bookCard);
    });
}

function deleteBook(index) {
    // Show confirmation popup before deleting the book
    popBox("Are you sure you want to delete this book?", function () {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks(); // Re-render
        customAlert("Book is deleted successfully!", 'success');
    });
}

function editBook(index) {
    // You can redirect to an edit page and pass index as a query param
    window.location.href = `editBook.html?index=${index}`;
}

// Call the function on page load
window.onload = displayBooks;
