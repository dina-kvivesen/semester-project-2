/* export default function logOut() {

  const logoutButton = document.querySelector('#logout');

  if (logoutButton) {
  logoutButton.addEventListener('click', function () {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    location.href = '/index.html';
  });
}
}  */


import { clearStorage } from "../../utils/storage.js";

export default function logOut() {
    const logoutButton = document.querySelector("#logout");

    if (logoutButton) {
        logoutButton.onclick = function () {
            const doLogout = confirm("Are you sure?");

            if (doLogout) {
                clearStorage();
                location.href = "/";
            } 
        };
    } 
}