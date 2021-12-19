import {
  cartItemsKey,
  saveToStorage,
  getFromStorage
} from "./utils/storage.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const productContainer = document.querySelector(".container__products__cart");
const clearBtn = document.querySelector("#clearCart");
const priceContainer = document.querySelector(".container__products__cart__price");

clearBtn.addEventListener("click", function () {
  window.localStorage.removeItem(cartItemsKey);
  displayCart(getFromStorage(cartItemsKey));
});

let priceArray = [];

const cartItems = getFromStorage(cartItemsKey);
displayCart(cartItems);

function displayCart(products) {
  productContainer.innerHTML = "";

if(products.length === 0) {
  productContainer.innerHTML = "Your cart is empty.";
  priceContainer.style.display = "none";
} else {
  products.forEach(function (product) {
    const productImg = "http://localhost:1337" + product.image;
    
    priceArray.push(product.price);
    let featured = "";
    if (product.featured === null || !product.featured) {
        featured = false;
    } else {
        featured = true;
    }
    if (featured) {
      productContainer.innerHTML += `
      <div class="row no-gutters">
          <div class="col-md-4">
              <div class="card--featured">
              <a href="product.html?id=${product.id}"><img src="${productImg}" class="card-img-top" alt="${product.title}"></a>
              <p>Featured product</p>
              </div>
          </div>
          <div class="col-md-8">
              <div class="card-body">
                  <h4>${product.title}</h4>
                  <p class="card-text">${product.price} kr</p>
                  <div>
                      <a class="details-btn"" href="product.html?id=${product.id}">View details <i class="fas fa-angle-right"></i></a>
                      <p class="btn btn-outline-dark" id="removeBtn" data-id="${product.id}"><i class="far fa-trash-alt"></i> Remove</p>
                  </div>
              </div>
          </div>
      </div>
      <hr>`;
  } else {
      productContainer.innerHTML += `
<div class="row no-gutters">
<div class="col-md-4">
  <a href="product.html?id=${product.id}"><img src="${productImg}" class="card-img-top" alt="${product.title}"></a>
</div>
<div class="col-md-8">
  <div class="card-body">
      <h4>${product.title}</h4>
      <p class="card-text">${product.price} kr</p>
          <div>
              <a class="details-btn" href="product.html?id=${product.id}">View details <i class="fas fa-angle-right"></i></a>
              <p class="btn btn-outline-dark" id="removeBtn" data-id="${product.id}"><i class="far fa-trash-alt"></i> Remove</p>
          </div>
  </div>
</div>
</div>
<hr>`;
  }
});
}

const removeBtns = document.querySelectorAll("#removeBtn");
removeBtns.forEach(function (btn) {
    btn.addEventListener("click", (event) => removeFromCart(event))
});

getTotalCost(priceArray);
}

function getTotalCost(priceArray) {
const containerTotalPrice = document.querySelector(".container__products__cart__price span");

const totalPrice = priceArray.reduce(function (a, b) {
    return a + b;
}, 0)
containerTotalPrice.innerHTML = totalPrice;
}

function removeFromCart(event) {
const cartItems = getFromStorage(cartItemsKey);
const id = parseInt(event.target.dataset.id);

const newCartItems = cartItems.filter(function (cartItem) {
    if (cartItem.id !== id) {
        return true;
    }
});

saveToStorage(cartItemsKey, newCartItems);
priceArray = [];
displayCart(newCartItems);
}


