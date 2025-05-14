const forgotForm = document.getElementById("forgotForm");

// When the user clicks on the forgot password "forgot form" call the handleForgotPassword function
if (forgotForm) {
    forgotForm.addEventListener("submit", handleForgotPassword);
}

function handleForgotPassword(event) {
    // Prevent the page from reload
    event.preventDefault();

    const email = document.getElementById("forgotEmail").value.trim();
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch("/forgot-password/submit/", {
        method: "POST",
        // Send the email in JSON format
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ email: email })
    })
        .then(response => {
            return response.json().then(data => {
                // If there is an error like there is no such email throw error
                if (!response.ok) throw new Error(data.error);
                return data;
            });
        })
        .then(data => {
            //  Password has changed successfully
            document.getElementById("alertContainer").innerText = data.message;
            setTimeout(() => {  window.location.href = "/signin/"; }, 5000);
        })
        .catch(error => {
            document.getElementById("alertContainer").innerText = error.message;
        });
}
