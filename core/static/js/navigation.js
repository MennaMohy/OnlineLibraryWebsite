function generateNavbar() {
    const navbar = document.getElementById('navbar');

    let html = `
        <div class="side_Nav">
            <a href="#" class="icon">
                <i class="fa-solid fa-bars" style="color: #F3E9DC; font-size: 25px; position: fixed; left: 18px; top: 15px;"></i>
            </a>
            <ul class="NavLink">
    `;

   // admin navigation bar
    if (userRole === 'admin') {
        html += `
            <li><i class="fa-solid fa-house" style="color: #fff3dc;"></i>
                <a href="/admin-home/">Home Page</a></li>
            <li><i class="fa-solid fa-inbox" style="color: #fff3db;"></i>
                <a href="/available-books/">View available books</a></li>
            <li><i class="fa-solid fa-circle-info" style="color: #fff3db;"></i>
                <a href="/about-us/">About us</a></li>

        `;
    // user navigation bar
    } else {
        html += `
            <li><i class="fa-solid fa-house" style="color: #fff3dc;"></i>
                <a href="/user-home/">Home Page</a></li>
            <li><i class="fa-solid fa-inbox" style="color: #fff3db;"></i>
                <a href="/available-books/">View available books</a></li>
            <li><i class="fa-solid fa-book" style="color: #fff3db;"></i>
                <a href="/borrowed-books/">Your books</a></li>
            <li><i class="fa-solid fa-circle-info" style="color: #fff3db;"></i>
                <a href="/about-us/">About us</a></li>
        `;
    }

    html += `
        <li><i class="fa-solid fa-right-from-bracket" style="color: #f5f5dc;"></i>
            <a href="/signin/">Logout</a></li>
        </ul>
    </div>
    `;

    navbar.innerHTML = html;
}

window.onload = generateNavbar;
