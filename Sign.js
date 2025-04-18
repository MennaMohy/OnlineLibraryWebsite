let signed = false;

const form = document.getElementById("signupForm");

// Handle form submission
if (form) {
    form.addEventListener("submit", handleSignUp);
}

// Function to handle sign up process
function handleSignUp(event) {
    event.preventDefault(); // Prevent page reload

    let isAdminValue = document.getElementById("isAdmin").value;
    let userType;

    if (isAdminValue === "yes") {
        userType = "admin";
    } else if (isAdminValue === "no") {
        userType = "user";
    }

    // Get user's information
    let userName = document.getElementById("UserName").value.trim();
    let userEmail = document.getElementById("email").value.trim();
    let userPass = document.getElementById("pass").value;
    let userPassCheck = document.getElementById("passCheck").value;

    // Password match check
    if (userPass !== userPassCheck) {
        customAlert("Passwords do not match!", "error");
        return;
    }

    // Get the list of existing users from local storage
    let users = JSON.parse(localStorage.getItem("Users")) || [];

    // Email used check
    if (users.some(user => user.email === userEmail)) {
        customAlert("Email is already taken!", "error");
        return;
    }

    // Add the new user's info
    users.push({ name: userName, email: userEmail, pass: userPass, role: userType });

    // Save the updated users list to local storage
    localStorage.setItem("Users", JSON.stringify(users));

    // Mark the user as signed in
    localStorage.setItem("signed", "true");

    // Store the logged-in user's data
    localStorage.setItem("loggedInUser", JSON.stringify({ name: userName, email: userEmail, role: userType }));

    // Redirect based on role
    window.location.href = userType === "admin" ? "Admin_Homepage.html" : "UserHomePage.html";
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
