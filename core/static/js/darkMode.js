// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if dark mode preference is stored
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply dark mode if it was previously enabled
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateToggleIcon(true);
    }
    
    // Add click event listener to toggle button
    const toggleButton = document.querySelector('.dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }
    
    // Adjust dark mode toggle position based on search container presence
    adjustDarkModeTogglePosition();
});

function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        // Switch to light mode
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
        updateToggleIcon(false);
    } else {
        // Switch to dark mode
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
        updateToggleIcon(true);
    }
}

function updateToggleIcon(isDarkMode) {
    const toggleButton = document.querySelector('.dark-mode-toggle');
    if (toggleButton) {
        const icon = toggleButton.querySelector('i');
        if (icon) {
            if (isDarkMode) {
                icon.className = 'fas fa-sun';
                icon.title = 'Switch to Light Mode';
            } else {
                icon.className = 'fas fa-moon';
                icon.title = 'Switch to Dark Mode';
            }
        }
    }
}

// Function to check system preference
function checkSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // System prefers dark mode
        if (!localStorage.getItem('darkMode')) {
            // Only apply if user hasn't made a choice yet
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
            updateToggleIcon(true);
        }
    }
}

// Listen for system preference changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkSystemPreference);
}

// Initialize system preference check
checkSystemPreference();

function adjustDarkModeTogglePosition() {
    const searchContainer = document.querySelector('.search-container');
    
    if (searchContainer) {
        // If search container exists, add a class to body for CSS targeting
        document.body.classList.add('has-search');
    } else {
        // If no search container, remove the class
        document.body.classList.remove('has-search');
    }
} 