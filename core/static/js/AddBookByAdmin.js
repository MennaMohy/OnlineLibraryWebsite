document.getElementById("bookForm").addEventListener("submit", function (e) {

    const id = document.getElementById("book-id").value.trim();
    const title = document.getElementById("book-name").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const category = document.getElementById("book-category").value;
    const description = document.getElementById("book-description").value.trim();
    const imageInput = document.getElementById("book-image");
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        customAlert("Please upload a book cover!", "error");
        return;
    }

    // Call the popBox function to ask for confirmation
    popBox("Are you sure you want to add this book?", function () {
        const reader = new FileReader();

        reader.onload = function(event) {
            const base64Image = event.target.result;

            const newBook = {
                id,
                title,
                author,
                category,
                description,
                image: base64Image,
                available: true
            };

            let books = JSON.parse(localStorage.getItem("books")) || [];
            books.push(newBook);
            localStorage.setItem("books", JSON.stringify(books));
            window.getBookByTitle = getBookByTitle;

            // Clear the form after submission
            e.target.reset();

            sessionStorage.setItem('bookUpdated', 'true');

            // Show success message and redirect
            window.location.href = 'manage_books.html';
        };

        reader.readAsDataURL(imageFile); // Convert image to Base64 string
    });
});
