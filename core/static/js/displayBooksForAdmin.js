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

// Remove the undefined function call
// window.onload = displayBooks;



document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are loaded
    setTimeout(() => {
        const bookCards = document.querySelectorAll('.admin-book-card');
        const modal = document.getElementById('bookDetailsModal');

        // Update availability status for all book cards
        bookCards.forEach(card => {
            const bookId = card.getAttribute('data-book-id');
            const totalQuantity = parseInt(card.getAttribute('data-book-quantity'));
            const users = borrowedUsersData[bookId] || [];
            const borrowedCount = users.length;
            const availableCount = totalQuantity - borrowedCount;
            
            const availabilityElement = card.querySelector('.availability-status');
            if (availabilityElement) {
                if (availableCount > 0) {
                    availabilityElement.textContent = '✓ Available';
                    availabilityElement.className = 'availability-status available';
                } else {
                    availabilityElement.textContent = '✗ Not Available';
                    availabilityElement.className = 'availability-status unavailable';
                }
            }
        });

        bookCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Prevent click on edit/delete buttons from triggering modal
                if (e.target.closest('.book-actions')) return;
                
                const bookId = card.getAttribute('data-book-id');
                const bookTitle = card.getAttribute('data-book-title');
                const totalQuantity = parseInt(card.getAttribute('data-book-quantity'));
                
                // Get borrowed users from the global data
                const users = borrowedUsersData[bookId] || [];
                const borrowedCount = users.length;
                const availableCount = totalQuantity - borrowedCount;
                
                // Show availability status and quantity
                let statusHtml = '';
                if (availableCount > 0) {
                    statusHtml = `<p style="color: #2e7d32; font-weight: bold; margin: 10px 0;">✓ Available for borrowing</p>`;
                } else {
                    statusHtml = `<p style="color: #c62828; font-weight: bold; margin: 10px 0;">✗ All copies currently borrowed</p>`;
                }
                
                // Show quantity information
                const quantityHtml = `<p style="color: #8b4513; font-family: Georgia, serif; margin: 10px 0;"><strong>Quantity:</strong> <span style="color: #2e7d32; font-weight: bold;">${availableCount} available</span> out of ${totalQuantity} total copies</p>`;
                
                // Show borrowed users list
                let usersHtml = '';
                if (users.length > 0) {
                    usersHtml = `
                        <p style="color: #8b4513; font-family: Georgia, serif; margin: 15px 0 10px 0;"><strong>Currently borrowed by (${borrowedCount}):</strong></p>
                        <ul style="max-height: 150px; overflow-y: auto; border: 1px solid #ddd; padding: 15px; border-radius: 5px; background: #f9f9f9; margin: 10px 0; font-family: Georgia, serif;">
                            ${users.map(u => `<li style="margin: 10px 0; padding: 8px; border-bottom: 1px solid #eee; color: #8b4513; font-family: Georgia, serif;">${u.name} (${u.email})</li>`).join('')}
                        </ul>
                    `;
                } else {
                    usersHtml = '<p style="color: #8b4513; font-family: Georgia, serif; margin: 15px 0 10px 0;"><strong>Currently borrowed by:</strong> <span style="color: #666; font-style: italic;">No active borrows</span></p>';
                }
                
                // Update the modal content
                const modalContent = modal.querySelector('.popup-box');
                const modalHtml = `
                    <h2 style="color: #8b4513; font-family: Georgia, serif; margin-bottom: 20px; text-align: center;">${bookTitle}</h2>
                    ${quantityHtml}
                    ${statusHtml}
                    ${usersHtml}
                    <div class="popup-buttons">
                        <button id="closeBookDetails" class="button-dark" style="width: auto; margin-top: 15px;">Close</button>
                    </div>
                `;
                
                modalContent.innerHTML = modalHtml;
                
                // Re-attach close button event
                const newCloseBtn = modalContent.querySelector('#closeBookDetails');
                newCloseBtn.addEventListener('click', function() {
                    modal.classList.add('hidden');
                });
                
                modal.classList.remove('hidden');
            });
        });
        
        // Optional: close modal on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.classList.add('hidden');
        });
    }, 100); // Wait 100ms to ensure DOM is fully loaded
});
