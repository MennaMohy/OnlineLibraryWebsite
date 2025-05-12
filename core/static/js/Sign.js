let signed = false;

const form = document.getElementById("signupForm");

// Handle form submission
if (form) {
    form.addEventListener("submit", handleSignUp);
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
const savedEmail = document.getElementById("savedEmail");
const savedPass = document.getElementById("savedPass");

if (savedEmail && savedPass) {
    savedEmail.closest("form").addEventListener("submit", function (event) {
        event.preventDefault();
        checkLogIn();
    });
}

// Function to handle sign in
function checkLogIn() {
    let enteredEmail = document.getElementById("savedEmail").value.trim();
    let enteredPass = document.getElementById("savedPass").value;

    let users = JSON.parse(localStorage.getItem("Users")) || [];

    let validUser = users.find(user =>
        (user.email === enteredEmail || user.name === enteredEmail) && user.pass === enteredPass
    );

    if (!validUser) {
        customAlert("Invalid email or password!", "error");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    localStorage.setItem("signed", "true");

    window.location.href = validUser.role === "admin" ? "Admin_Homepage.html" : "UserHomePage.html";
}
