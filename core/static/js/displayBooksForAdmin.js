
function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        fetch(`/admin-home/manage-books/delete/${bookId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Book deleted successfully.");
                window.location.reload();
            } else {
                alert("Failed to delete book.");
            }
        });
    }
}

function editBook(bookId) {
    window.location.href = `/admin-home/manage-books/edit/${bookId}/`;
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
