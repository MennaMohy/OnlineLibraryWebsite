function customAlert(message, type = "success") {
    const alertContainer = document.getElementById("alertContainer");
    if (!alertContainer) return;

    alertContainer.innerHTML = `
        <div class="custom-alert ${type}">
            <strong>${type === "success" ? "Success!" : "Error!"}</strong> ${message}
            <span class="close-btn" onclick="this.parentElement.remove()">×</span>
        </div>
    `;
    // Automatically removed after 3 seconds
    setTimeout(() => {
        const alert = alertContainer.querySelector('.custom-alert');
        if (alert) alert.remove();
    }, 3000);
}
document.addEventListener('DOMContentLoaded', function() {
    // Check if the book update success flag exists
    if (sessionStorage.getItem('bookUpdated') === 'true') {
        // Display the success alert
        customAlert("Book updated successfully!", "success");

        // Remove the flag, so it doesn't show again after reload
        sessionStorage.removeItem('bookUpdated');
    }
});
