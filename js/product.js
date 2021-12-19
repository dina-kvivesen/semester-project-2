import { baseUrl } from "./settings/api.js";
import {
    cartItemsKey,
    saveToStorage,
    getFromStorage
} from "./utils/storage.js";
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

async function getProduct() {
    try {
        const productsUrl = baseUrl + `products?id=${id}`;
        const response = await fetch(productsUrl);
        const product = await response.json();
        createProduct(product);
        isItemInCart(product);
        addToCart(product);
    } catch (error) {
        console.log(error);
        displayMessage('error', error, '.result-container');
}
}

getProduct();

function createProduct(products) {
    let buttonContent = "";
    if (isItemInCart(products)) {
        buttonContent = "Remove from cart";
    } else {
        buttonContent = "Add to cart";
    }

    const container = document.querySelector(".result-container");
    container.innerHTML = "";
    let featured = "";

    products.forEach(function (product) {
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
                    <img src="${productImg}" alt="${product.title} shoe">
                    ${featured}
                </div>
                <div class="product-details__text">
                    <h4>${product.title}</h4>
                    <p>${product.price} kr</p>
                    <p>${product.description}</p>
                    <a class="add-cart" id="addToCartBtn">${buttonContent}</a>
                </div>
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
    const button = document.querySelector("#addToCartBtn");

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