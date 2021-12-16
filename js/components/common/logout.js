export default function logOut() {
    const logoutButton = document.querySelector("#logout");

    if (logoutButton) {
        logoutButton.onclick = function () {
            const doLogout = confirm("Are you sure?");

            if (doLogout) {
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('token');
                location.href = "/";
            } 
        };
    } 
}