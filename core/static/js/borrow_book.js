
// user borrow a book
document.addEventListener("DOMContentLoaded", function () {
    const bookTitle = document.body.dataset.bookTitle;
    const borrowButton = document.getElementById("borrow_button");

    borrowButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission

        // Corrected popBox call
        popBox(`Are you sure you want to borrow "${bookTitle}"?`, function () {
            fetch(`/borrow-book/${borrowButton.dataset.bookId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify({ borrowed: true })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    customAlert(`"${bookTitle}" is successfully borrowed!`, "success");

                    // Update button state
                    borrowButton.textContent = "Borrowed";
                    borrowButton.disabled = true;
                    borrowButton.className = "button-light";
                    borrowButton.style.pointerEvents = "none";

                    // Update availability status in user home page
                    const availabilitySpan = document.querySelector(`#availability-${borrowButton.dataset.bookId}`);
                    if (availabilitySpan) {
                        availabilitySpan.textContent = "Borrowed";
                        availabilitySpan.classList.remove('available');
                        availabilitySpan.classList.add('unavailable');
                    }
                } else {
                    customAlert(`Failed to borrow the book: ${data.message}`, "error");
                }
            })
            .catch(error => {
                customAlert(`Error: ${error}`, "error");
            });
        });
    });
});
