import { baseUrl } from "./settings/api.js";
import getIndexProducts from "./components/indexProducts.js";
import doFetch from "./components/doFetch.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const productsUrl = baseUrl + "products";

let mainProducts = [];

async function init() {
  mainProducts = await doFetch(productsUrl);
  getIndexProducts(mainProducts, '.container__products');
}

init();
