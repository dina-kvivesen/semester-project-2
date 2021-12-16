import { getExistingCart } from "./components/favFunctions.js";
import createProductHtml from "./components/allProducts.js";
import createHtml from "./components/indexProducts.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const cartProducts = getExistingCart();
const productContainer = document.querySelector(".result-container");
const totalContainer = document.querySelector(".total-container")

if(cartProducts.length === 0) {
  productContainer.innerHTML = "Your cart is empty.";
}


/* 
function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  if (cartCost != null) {
      cartCost = parseFloat(cartCost);
      localStorage.setItem("totalCost", cartCost +
      product.price);
  } else {
      localStorage.setItem("totalCost", product.price);
  }
} */


/* cartProducts.forEach(product => {
  totalCost(product);
  console.log(totalCost); */




  for (let i=0; i < cartProducts.length; i++) {
    totalCost(cartProducts);
    console.log(cartProducts[i].price);

  function totalCost(cartProducts) {
  let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", parseFloat(cartCost) +
        parseFloat(cartProducts[i].price));
    } else {
        localStorage.setItem("totalCost", cartProducts[i].price);
    }
  }
}

  cartProducts.forEach(product => {

  const productImageUrl = "http://localhost:1337" + product.image;
  console.log(productImageUrl);
  const cartCost = localStorage.getItem('totalCost');
  productContainer.innerHTML += `<div class="products-container">
                                  <div class="card" style="width: 15rem;">
                                  <img src="${productImageUrl}" alt="${product.title}" class="card-img-top">
                                  <h4>${product.title}</h4>
                                  <p>Price: ${product.price} kr</p>
                                  </div>
                                </div>
                                
                                <div class="basketTotalContainer">
                                  <h4 class="basketTotalTitle">
                                      Basket Total
                                      </h4>
                                      <h4 class="basketTotal">
                                          Nok ${cartCost}
                                      </h4>
                                </div>`

  })

  

function removeButton() {
  const removeBtn = document.querySelector("#remove");

  removeBtn.addEventListener("click", clearList);

function clearList() {
  if (confirm("Are you sure?")) {
    // clear the localstorage
    localStorage.clear();
    // clear the list
    productContainer.innerHTML = "";
    }
  }
}
removeButton();
