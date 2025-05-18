const form = document.getElementById('editForm');
const bookId = form.dataset.bookId;
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const bookTitle = document.getElementById('title').value;

    formData.append('title', bookTitle);
    formData.append('author', document.getElementById('author').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('description', document.getElementById('description').value);

    const imageInput = document.getElementById('image');
    if (imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0]);
    }

    formData.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);

    popBox(`Save changes to "${bookTitle}"?`, () => {
        fetch(`/admin-home/manage-books/edit/${bookId}/`, {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (res.redirected) {
                sessionStorage.setItem('bookEdited', 'true');
                window.location.href = res.url;
                return;
            }
            return res.json();
        })
        .then(data => {
            if (data?.success) {
                customAlert('Book updated successfully!', 'success');
            } else if (data?.message) {
                customAlert(`Error: ${data.message}`, 'error');
            }
        })
        .catch(err => customAlert(`Error: ${err}`, 'error'));
    });
});
