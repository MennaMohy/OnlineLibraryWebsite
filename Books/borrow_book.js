
document.addEventListener("DOMContentLoaded", function () {
    const bookTitle = document.body.dataset.bookTitle;
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

    const book = storedBooks.find(b => b.title === bookTitle);

    if (!book) {
        console.error("Book not found in storage");
        return;
    }

    // Fill the book details in the page
    document.getElementById("Title").textContent = "Title: " + book.title;
    document.getElementById("Author").textContent = "Author: " + book.author;
    document.getElementById("Description").textContent = "Description: " + book.description;

    // Disable the button if already borrowed
    const borrowButton = document.getElementById("borrow_button");
    if (book.borrowed) {
        borrowButton.style.display = "none";
    }
    else{
        borrowButton.style.display = "inline-block";
    }


    // Borrow button functionality
    borrowButton.addEventListener("click", function () {
        // Update the book in books list
        const index = storedBooks.findIndex(b => b.title === book.title);
        if (index !== -1) {
            storedBooks[index].borrowed = true;
        }

        // Update borrowed books list
        let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

        // Avoid duplicates
        const alreadyBorrowed = borrowedBooks.some(b => b.title === book.title);
        if (!alreadyBorrowed) {
            borrowedBooks.push(storedBooks[index]); // Push updated version
        }

        // Save back
        localStorage.setItem('books', JSON.stringify(storedBooks));
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));

        // Redirect or update UI
        window.location.href = "../UserHomePage.html";
    });
});