import createMenu from "./components/common/createMenu.js";
import {
  getToken,
  getUsername
} from "./utils/storage.js";
import getProducts from "./components/admin/adminProducts.js";

getProducts();
createMenu();
const username = getUsername();

const h1 = document.querySelector("h1");
h1.innerHTML = `Hi ${username}`;