/*document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const searchTerm = document.getElementById('searchInput').value.trim();

        if (!searchTerm) {
            alert('Please enter a search term');
            return;
        }

        // Save search parameters
        sessionStorage.setItem('searchTerm', searchTerm);

        // Redirect to results page
        window.location.href = 'Results.html';
    });
});*/