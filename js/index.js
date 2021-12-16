import { baseUrl } from "./settings/api.js";
import createHtml from "./components/indexProducts.js";
import doFetch from "./components/getProducts.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const productsUrl = baseUrl + "products";

let mainProducts = [];

async function init() {
  mainProducts = await doFetch(productsUrl);
  createHtml(mainProducts, '.container__products');
}

init();
