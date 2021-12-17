import { getUsername } from "../../utils/storage.js";
import logOut from "./logout.js";

export default function createMenu() {
    const { pathname } = document.location;

    const lgContainer = document.querySelector(".nav-icons-lg span ");
    const logoutBtn = document.querySelector(".nav-icons-sm span");
    
    const navLinks = document.querySelector(".navbar-nav");

    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}"><i class="bi bi-person"></i> Log in</a>`;

    if (username) {
        authLink = `<button class="btn btn-outline-dark" id="logout">Log out</button>`;

        navLinks.innerHTML +=  ` <li class="nav-item"><a href="admin.html" class="nav-link ${pathname === "/admin.html" ? "active" : ""}">Admin</a></li>`;
        
    }
    
        logoutBtn.innerHTML = `${authLink}`;


        logOut();

}
