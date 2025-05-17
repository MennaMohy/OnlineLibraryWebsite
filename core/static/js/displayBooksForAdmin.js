function popBox(message, callback) {
    const modal = document.getElementById("popBoxModal");
    const messageEl = document.getElementById("popBoxMessage");
    const confirmBtn = document.getElementById("popBoxConfirmBtn");
    const cancelBtn = document.getElementById("popBoxCancelBtn");

    messageEl.textContent = message;
    modal.style.display = "flex";

    confirmBtn.onclick = () => {
        modal.style.display = "none";
        callback();
    };
    cancelBtn.onclick = () => {
        modal.style.display = "none";
    };
}
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('bookDeleted') === 'true') {
        customAlert("Book deleted successfully!", "success");
        sessionStorage.removeItem('bookDeleted');
    }
});


function deleteBook(bookId) {
    popBox("Are you sure you want to delete this book?", function () {
        fetch(`/admin-home/manage-books/delete/${bookId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => {
            if (response.ok) {
                // Set flag to show success message after reload
                sessionStorage.setItem('bookDeleted', 'true');
                window.location.reload();
            } else {
                customAlert("Failed to delete book.", "error");
            }
        })
        .catch(error => {
            customAlert("An error occurred.", "error");
            console.error("Error deleting book:", error);
        });
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Call the function on page load
window.onload = displayBooks;
