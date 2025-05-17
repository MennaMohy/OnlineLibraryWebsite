document.addEventListener('DOMContentLoaded', () => {
    const meta = document.getElementById('editPageMeta');
    const bookId = meta.dataset.bookId;
    const bookTitle = meta.dataset.bookTitle;
    const form = document.getElementById('bookForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const payload = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
            image: document.getElementById('image').value, // Or handle file input differently
            available: document.getElementById('available').checked  // for checkbox
        };

        popBox(`Save changes to "${bookTitle}"?`, () => {
            fetch(`/admin-home/manage-books/edit/${bookId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    customAlert('Book updated successfully!', 'success');
                    setTimeout(() => location.href = '/admin-home/manage-books/', 1000);
                } else {
                    customAlert(`Error: ${data.message}`, 'error');
                }
            })
            .catch(err => customAlert(`Error: ${err}`, 'error'));
        });
    });
});
