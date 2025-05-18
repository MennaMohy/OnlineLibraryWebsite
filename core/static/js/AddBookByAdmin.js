document.getElementById("bookForm").addEventListener("submit", function (e) {
    const title = document.getElementsByName("title")[0].value.trim();
    const imageInput = document.getElementsByName("image")[0];

    if (!imageInput.files.length) {
        e.preventDefault();
        customAlert("Please upload a book cover!", "error");
        return;
    }

    // Prevent default submission until confirmation
    e.preventDefault();

    // Show confirmation popup
    popBox("Are you sure you want to add this book?", () => {
        // Store success message temporarily in sessionStorage
        sessionStorage.setItem("bookAdded", "true");

        // Submit the form normally
        document.getElementById("bookForm").submit();
    });
});
