document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementsByName("title")[0].value.trim();
    const author = document.getElementsByName("author")[0].value.trim();
    const category = document.getElementsByName("category")[0].value;
    const description = document.getElementsByName("description")[0].value.trim();
    const imageInput = document.getElementsByName("image")[0];
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        customAlert("Please upload a book cover!", "error");
        return;
    }

    // Show confirmation popup
    popBox("Are you sure you want to add this book?", function () {
        const reader = new FileReader();

        reader.onload = function(event) {
            const base64Image = event.target.result;

            const newBook = {
                id: Date.now().toString(),
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

            sessionStorage.setItem('bookUpdated', 'true');

            // Redirect after adding the book
            window.location.href = 'manage_books.html';
        };

        reader.readAsDataURL(imageFile);
    });
});
