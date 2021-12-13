import { getUsername } from "../../utils/storage.js";

export default function createMenu() {
    const { pathname } = document.location;

    const smContainer = document.querySelector(".nav-icons-sm span");
    const lgContainer = document.querySelector(".nav-icons-lg span");
    const navLinks = document.querySelector(".navbar-nav");

    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Log in</a>`;

    if (username) {
        authLink = `<a href="/" class="${pathname === "/" ? "active" : ""}">Log out</a>`;
        navLinks.innerHTML +=  ` <li class="nav-item"><a href="admin.html" class="nav-link ${pathname === "/admin.html" ? "active" : ""}">Admin</a></li>`;
    }

    console.log(username);

    smContainer.innerHTML = `${authLink}`;

    lgContainer.innerHTML = `${authLink}`;


}