// Sign Up section
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", handleSignUp);
}

// Function to handle sign up process
function handleSignUp(event) {
    event.preventDefault(); // Prevent page reload

    // Get user's information
    let userName = document.getElementById("UserName").value.trim();
    let userEmail = document.getElementById("email").value.trim();
    let userPass = document.getElementById("pass").value;
    let userPassCheck = document.getElementById("passCheck").value;
    let isAdminValue = document.getElementById("isAdmin").value;

    let userType = isAdminValue === "yes" ? "admin" : "user";

    let csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Password length check
    if (userPass.length < 8) {
        customAlert("Password must be at least 8 characters!", "error");
        return;
    }
    // Password match check
    if (userPass !== userPassCheck) {
        customAlert("Passwords do not match!", "error");
        return;
    }
    // Send the user data in JSON format so the server can read it
    fetch("/signup/submit/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: userPass,
            role: userType
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.error); });
        }
        // If there is no error continue to send the response
        return response.json();
    })
     .then(data => {
            customAlert("Signed up successfully!", "success");
            window.location.href = userType === "admin" ? "/admin-home/" : "/user-home/";
        })
        .catch(error => {
            customAlert(error.message, "error");
        });
}

// Sign In section
const signinForm = document.getElementById("signinForm");

if (signinForm) {
    signinForm.addEventListener("submit", handleSignIn);
}

// Function to handle sign in
function handleSignIn(event) {
    event.preventDefault();

    let email= document.getElementById("savedEmail").value.trim();
    let password = document.getElementById("savedPass").value;

    let csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch("/signin/submit/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.error); });
        }
        return response.json();
    })
    .then(data => {
        customAlert("Signed in successfully!", "success");
        window.location.href = data.role === "admin" ? "/admin-home/" : "/user-home/";
    })
    .catch(error => {
        customAlert(error.message, "error");
    });
}
