import { getExistingCart } from "./favFunctions.js";
export default function createProductHtml(product, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = "";
    
    const cart = getExistingCart();

    for (let i = 0; i < product.length; i++) {
        console.log(product);
        cart.find(function(cartProduct) {

            return parseInt(cartProduct.id) === product[i].id;
            
            
        })

        
        const productImageUrl = "http://localhost:1337" + product[i].image.url;
        
        if (product[i].featured === false) {
          
        element.innerHTML += `<div class="result">
                                <div class="card" style="width: 15rem;">
                                    <img src="${productImageUrl}" alt="${product[i].title}" class="card-img-top">
                                    <a href="product.html?id=${product[i].id}"
                                    <div class="card-body">
                                        <h4 class="card-title">${product[i].title}</h4>
                                        <p>${product[i].price} kr</p>
                                    </div>
                                    </a>
                                    <button class="add-cart"><i class="bi bi-bag"  data-id="${product[i].id}" data-title="${product[i].title}" data-price="${product[i].price}" data-image="${product[i].image.url}"> Add to cart</i></button>
                                </div>
                             </div>`;

        }
    
    }

const cartButtons = document.querySelectorAll(".result .add-cart");

cartButtons.forEach((button) => {
    button.onclick = addToCart;
});

function addToCart(event) {

    const id = event.target.dataset.id;
    const title = event.target.dataset.title;
    const price = event.target.dataset.price;
    const image = event.target.dataset.image;

    const currentCart = getExistingCart();

    console.log(getExistingCart);

    const productExists = currentCart.find(function(cartProduct) {
        return cartProduct.id === id;
    });

    if(!productExists) {
        const product = { id: id, title: title, price: price, image: image};
        console.log(product);
        console.log(currentCart);
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
