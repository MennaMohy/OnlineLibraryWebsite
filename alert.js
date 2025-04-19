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