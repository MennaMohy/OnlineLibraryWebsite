let signed = false;

const form = document.getElementById("signupForm");
const userBtn = document.getElementById("userBtn");
const adminBtn = document.getElementById("adminBtn");

// Default signed in is user
let userType = "user";

// If the is admin button is clicked then it is an admin
adminBtn.addEventListener("click", function () {
    userType = "admin";
});

form.addEventListener("submit", function (event) {
    // Prevent page reload
    event.preventDefault();

    // Get user's information
    let userName = document.getElementById("UserName").value.trim();
    let userEmail = document.getElementById("email").value.trim();
    let userPass = document.getElementById("pass").value;
    let userPassCheck = document.getElementById("passCheck").value;

    // Password match check
    if (userPass !== userPassCheck) {
        alert("Passwords do not match!");
        return;
    }

    // Get the list of existing users from local storage
    let users = JSON.parse(localStorage.getItem("Users")) || [];

    // Email used check
    if (users.some(user => user.email === userEmail)) {
        alert("Email already taken!");
        return;
    }

    // Add the new user's info
    users.push({ name: userName, email: userEmail, pass: userPass, role: userType });

    // Save the updated users list to localStorage
    localStorage.setItem("Users", JSON.stringify(users));

    // Mark the user as signed in
    localStorage.setItem("signed", "true");

    // Store the logged-in user's data
    localStorage.setItem("loggedInUser", JSON.stringify({ name: userName, email: userEmail, role: userType }));

    // Redirect to appropriate homepage
    if (userType === "admin") {
        window.location.href = "Admin_Homepage.html";
    } else {
        window.location.href = "UserHomePage.html";
    }
});
