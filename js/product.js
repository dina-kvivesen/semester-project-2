import { baseUrl } from "./settings/api.js";
import { getExistingCart } from "./components/favFunctions.js";
import doFetch from "./components/getProduct.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

function createHtml(product, targetElement) {
    const element = document.querySelector(targetElement);
    
    element.innerHTML = "";
   
    const cart = getExistingCart();
        
        cart.find(function(cartProduct) {

            return parseInt(cartProduct.id) === product.id;
        })

        const productImageUrl = "http://localhost:1337" + product.image.url;

          
        element.innerHTML += `<div class="product-details">
                                <div class="img-container" >
                                  <img src="${productImageUrl}" alt="${product.title}" style="width: 500px">
                                </div>
                                <div class="product-details__text">
                                  <h4 class="card-title">${product.title}</h4>
                                  <p>${product.price} kr</p>
                                  <p>${product.description}</p>
                                  <button class="add-cart"><i class="bi bi-bag" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image.url}"> Add to cart</i></button>
                                </div>
                             </div>`;

        const breadcrumb = document.querySelector(".breadcrumb-item.active");
        breadcrumb.innerHTML = `${product.title}`;
                            
    
const cartButtons = document.querySelectorAll(".product-details .add-cart");

cartButtons.forEach((button) => {
    button.onclick = addToCart;
});

function addToCart(event) {

    const id = event.target.dataset.id;
    const title = event.target.dataset.title;
    const price = event.target.dataset.price;
    const image = event.target.dataset.image;

    const currentCart = getExistingCart();

    const productExists = currentCart.find(function(cartProduct) {
        return cartProduct.id === id;
    });

    if(!productExists) {
        const product = { id: id, title: title, price: price, image: image};
        currentCart.push(product);
        saveCart(currentCart);
    } else {
        const newCart = currentCart.filter(cartProduct => cartProduct.id !== id);
        saveCart(newCart);
    }
}
function saveCart(cartProducts) {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
}
}

const productsUrl = baseUrl + "products/";

let mainProducts = [];

       
async function init() {
  mainProducts = await doFetch(productsUrl);
  createHtml(mainProducts, '.result-container');
}

init();