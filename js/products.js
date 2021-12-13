import { baseUrl } from "./settings/api.js";
import createProductHtml from "./components/createProductHtml.js";
import doFetch from "./components/getProducts.js";
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
     }
  });
  createProductHtml(filteredProducts, '.result-container');
};
       
async function init() {
  mainProducts = await doFetch(productsUrl);
  createProductHtml(mainProducts, '.result-container');
}

init();

