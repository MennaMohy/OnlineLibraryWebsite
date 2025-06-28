document.addEventListener('DOMContentLoaded', function() {
    console.log('Favorites.js loaded');
    
    // Handle favorite heart clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('favorite-heart')) {
            console.log('Heart clicked:', e.target.getAttribute('data-book-id'));
            e.preventDefault();
            e.stopPropagation();
            
            const bookId = e.target.getAttribute('data-book-id');
            toggleFavorite(bookId, e.target);
        }
    });

    // Initialize favorite status for all hearts on page load
    initializeFavoriteStatus();
});

function toggleFavorite(bookId, heartElement) {
    console.log('Toggling favorite for book:', bookId);
    
    fetch(`/toggle-favorite/${bookId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.status === 'favorited') {
            heartElement.classList.add('clicked');
            heartElement.style.color = '#ff4757';
            showNotification('Book added to favorites!', 'success');
        } else if (data.status === 'unfavorited') {
            heartElement.classList.remove('clicked');
            heartElement.style.color = '#ccc';
            showNotification('Book removed from favorites!', 'info');
        } else {
            showNotification(data.error || 'Error updating favorite status', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Error updating favorite status', 'error');
    });
}

function initializeFavoriteStatus() {
    const hearts = document.querySelectorAll('.favorite-heart');
    
    hearts.forEach(heart => {
        const bookId = heart.getAttribute('data-book-id');
        if (bookId) {
            checkFavoriteStatus(bookId, heart);
        }
    });
}

function checkFavoriteStatus(bookId, heartElement) {
    fetch(`/get-favorite-status/${bookId}/`)
    .then(response => response.json())
    .then(data => {
        if (data.is_favorite) {
            heartElement.classList.add('clicked');
            heartElement.style.color = '#ff4757';
        } else {
            heartElement.classList.remove('clicked');
            heartElement.style.color = '#ccc';
        }
    })
    .catch(error => {
        console.error('Error checking favorite status:', error);
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

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'info':
            notification.style.backgroundColor = '#17a2b8';
            break;
        default:
            notification.style.backgroundColor = '#6c757d';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
} 