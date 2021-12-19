import { baseUrl } from "./settings/api.js";
import allProducts from "./components/allProducts.js";
import doFetch from "./components/doFetch.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const search = document.querySelector(".search");
const productsUrl = baseUrl + "products";

let mainProducts = [];

search.onkeyup = function (event) {
  const searchValue = event.target.value.trim().toLowerCase();
  const filteredProducts = mainProducts.filter(function(filterProduct) {
    if(filterProduct.title.toLowerCase().startsWith(searchValue)) {
      return true;
     } else if (filterProduct.description && filterProduct.description.toLowerCase().includes(searchValue)) {
      return true;
  }
  });
  allProducts(filteredProducts, '.container__products');
};
       
async function init() {
  mainProducts = await doFetch(productsUrl);
  allProducts(mainProducts, '.container__products');
}

init();


