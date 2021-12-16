import { baseUrl } from "./settings/api.js";
import {
    cartItemsKey,
    saveToStorage,
    getFromStorage
} from "./utils/cartStorage.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/common/createMenu.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let id;

if (params.has("id")) {
    id = params.get("id");
} else {
    document.location.href = "index.html";
}

async function getSingleProduct() {
    try {
        const productsUrl = baseUrl + `products?id=${id}`;
        const response = await fetch(productsUrl);
        const product = await response.json();
        createSingleProduct(product);
        isItemInCart(product);
        addToCart(product);
    } catch (error) {
        console.log(error);
        displayMessage('error', error, '.result-container');
}
}

getSingleProduct();

function createSingleProduct(products) {
    let buttonText = "";
    if (isItemInCart(products)) {
        buttonText = "Remove from cart";
    } else {
        buttonText = "Add to cart";
    }

    const container = document.querySelector(".result-container");
    container.innerHTML = "";
    let featured = "";

    products.forEach(function (product) {
        console.log(product);
        document.title = "Bergen Shoes | " + product.title;
        if (product.featured === null || !product.featured) {
            featured = "";
        } else {
            featured = `<div class="card--featured">
            <p>Featured product</p>
            </div>`;
        }
        const productImg = "http://localhost:1337" + product.image.url;

        container.innerHTML += `
            <div class="product-details">
            <div class="img-container" >
            <img src="${productImg}" style="width: 500px" alt="${product.title} shoe">
            ${featured}
            </div>
            <div class="product-details__text">
            <h4>${product.title}</h4>
            <p>${product.price} kr</p>
            <p>${product.description}</p>
            <a class="add-cart" id="addToCartButton">${buttonText}</a>
        </div>`;
        const breadcrumb = document.querySelector(".breadcrumb-item.active");
        breadcrumb.innerHTML = `${product.title}`;
    });
    if (featured) {
        const featuredText = document.querySelector(".card--featured p");
        featuredText.style.position = "relative";
    }
}

function isItemInCart(product) {
    const cartItemsList = getFromStorage(cartItemsKey);
    const id = product[0].id;
    const itemInCart = cartItemsList.find(function (product) {
        return product.id === id;
    });
    if (itemInCart === undefined) {
        return false;
    } else {
        return true;
    }
}

function addToCart(product) {
    const button = document.querySelector("#addToCartButton");

    const id = product[0].id;
    let productImg = "";

    if (product[0].image) {
            productImg = product[0].image.url;
        }
    

    button.addEventListener("click", function (event) {
        const cartItemsList = getFromStorage(cartItemsKey);

        if (!isItemInCart(product)) {
            const cartItem = {
                id: product[0].id,
                title: product[0].title,
                image: productImg,
                description: product[0].description,
                price: product[0].price,
                featured: product[0].featured
            };

            cartItemsList.push(cartItem);
            saveToStorage(cartItemsKey, cartItemsList);
            event.target.innerText = "Remove from cart";

        } else {
            const newCartItemsList = cartItemsList.filter((product) => product.id !== id);
            saveToStorage(cartItemsKey, newCartItemsList);
            event.target.innerText = "Add to cart";
        }
    })
}


/* function createHtml(product, targetElement) {
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

init(); */