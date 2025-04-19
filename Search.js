document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const searchTerm = document.getElementById('searchInput').value.trim();
        const searchType = document.getElementById('searchType').value;

        if (!searchTerm) {
            alert('Please enter a search term');
            return;
        }

        // Save search parameters
        sessionStorage.setItem('searchTerm', searchTerm);
        sessionStorage.setItem('searchType', searchType);

        // Redirect to results page
        window.location.href = 'Results.html';
    });
});