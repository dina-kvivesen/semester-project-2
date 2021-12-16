import { getUsername } from "../../utils/storage.js";
import logOut from "./logout.js";

export default function createMenu() {
    const { pathname } = document.location;


    const smContainer = document.querySelector(".nav-icons-sm span ");
    const lgContainer = document.querySelector(".nav-icons-lg span ");
    const navLinks = document.querySelector(".navbar-nav");

    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Log in</a>`;

    if (username) {
        authLink = `<button id="logout">Log out</button>`;

        navLinks.innerHTML +=  ` <li class="nav-item"><a href="admin.html" class="nav-link ${pathname === "/admin.html" ? "active" : ""}">Admin</a></li>`;
        
    }

        lgContainer.innerHTML = `${authLink}`;
    
        smContainer.innerHTML = `${authLink}`;

        logOut();

}
