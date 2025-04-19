
// user borrowing a book
document.addEventListener("DOMContentLoaded", function () {
    // storing the book title
    const bookTitle = document.body.dataset.bookTitle;
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

    // storing whether the book title is stored in the local storage
    const book = storedBooks.find(b => b.title === bookTitle);

    if (!book) {
        console.error("Book not found in storage");
        return;
    }

    // Fill the book details in the page
    document.getElementById("Title").textContent = "Title: " + book.title;
    document.getElementById("Author").textContent = "Author: " + book.author;
    document.getElementById("Description").textContent = "Description: " + book.description;

    // Disable the borrow button if the book is already borrowed
    const borrowButton = document.getElementById("borrow_button");
    if (book.borrowed) {
        borrowButton.textContent = "Borrowed";
        borrowButton.disabled = true;
        borrowButton.className = "button-light";
        borrowButton.style.pointerEvents = "none";
    } else {
        borrowButton.textContent = "Borrow";
        borrowButton.disabled = false;
        borrowButton.style.backgroundColor = ""; // reset styling if any
    }
    // borrow button functionality
    borrowButton.addEventListener("click", function () {
        popBox(`Are you sure you want to borrow "${book.title}"?`, function () {
            const index = storedBooks.findIndex(b => b.title === book.title);
            if (index !== -1) {
                storedBooks[index].borrowed = true;
            }

            // Update borrowed books list
            let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

            // Avoid duplicates, if the user borrows a book he already borrowed, will not add it
            const alreadyBorrowed = borrowedBooks.some(b => b.title === book.title);
            if (!alreadyBorrowed) {
                borrowedBooks.push(storedBooks[index]);
            }

            // Save the borrowed books on the local storage
            localStorage.setItem('books', JSON.stringify(storedBooks));
            localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));


            // Show alert
            customAlert(`"${book.title}" is successfully borrowed!`, "success");

            // Disable and update borrow button
            borrowButton.textContent = "Borrowed";
            borrowButton.disabled = true;
            borrowButton.className = "button-light";
            borrowButton.style.pointerEvents = "none";
        });
    });
});