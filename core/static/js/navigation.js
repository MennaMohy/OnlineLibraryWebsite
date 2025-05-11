function generateNavbar() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const navbar = document.getElementById('navbar');

  const isInBooksFolder = window.location.pathname.includes("/images/");

  const prefix = isInBooksFolder ? "../" : "";

  const role = loggedInUser.role;

  let html = '';

  if (role === 'admin') {
    html = `
      <div class="side_Nav">
           <a href="#" class="icon">
            <i class="fa-solid fa-bars" style="color: #F3E9DC; font-size: 25px;position: fixed;left: 18px; top: 15px;"></i>
        </a>
        <ul class="NavLink">
            <li><i class="fa-solid fa-house" style="color: #fff3dc;"></i><a href="${prefix}Admin_Homepage.html">Home Page</a></li>
            <li><i class="fa-solid fa-inbox" style="color: #fff3db;"></i><a href="${prefix}viewAvailable.html">View available books</a></li>
            <li><i class="fa-solid fa-circle-info" style="color: #fff3db;"></i><a href="${prefix}aboutUs.html">About us</a></li>
            <li><i class="fa-solid fa-right-from-bracket" style="color: #f5f5dc;"></i><a href="#" onclick=
            "popBox('Are you sure you want to log out?', () => window.location.href='${prefix}WelcomePage.html')">Logout</a></li>
        </ul>
      </div>
    `;
  } else {
    html = `
      <div class="side_Nav">
        <a href="#" class="icon">
          <i class="fa-solid fa-bars" style="color: #F3E9DC; font-size: 25px;position: fixed;left: 18px; top: 15px;"></i>
        </a>
        <ul class="NavLink">
          <li><i class="fa-solid fa-house" style="color: #fff3dc;"></i><a href="${prefix}UserHomePage.html">Home Page</a></li>
          <li><i class="fa-solid fa-inbox" style="color: #fff3db;"></i><a href="${prefix}viewAvailable.html">View available books</a></li>
          <li><i class="fa-solid fa-book" style="color: #fff3db;"></i><a href="${prefix}viewBorrowed.html">Your books</a></li>
          <li><i class="fa-solid fa-circle-info" style="color: #fff3db;"></i><a href="${prefix}aboutUs.html">About us</a></li>
          <li><i class="fa-solid fa-right-from-bracket" style="color: #f5f5dc;"></i><a href="#" onclick=
          "popBox('Are you sure you want to log out?', () => window.location.href='${prefix}WelcomePage.html')">Logout</a>
          
        </ul>
      </div>
    `;
  }

  navbar.innerHTML = html;
}

window.onload = generateNavbar;
