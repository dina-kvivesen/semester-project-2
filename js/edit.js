import createMenu from "./components/common/createMenu.js";
import {
  baseUrl
} from "./settings/api.js";
import {
  getToken
} from "./utils/storage.js";
import warningMessage from "./components/warningMessage.js";
import {
  toggleDeleteProduct
} from "./components/admin/deleteProduct.js";

if (!getToken()) {
  location.href = "/";
}
createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let id;

if (params.has("id")) {
    id = params.get("id");
} else {
    document.location.href = "index.html";
}

toggleDeleteProduct(id);
getProduct(id);

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const descriptionInput = document.querySelector("#description");
const featuredCheck = document.querySelector("#featuredCheck");

const fileInput = document.querySelector("#uploadFile");
const fileLabel = document.querySelector(".custom-file-label");
const imgDisplay = document.querySelector("#uploadImage");

const message = document.querySelector("#messageContainer");

// Get product
async function getProduct() {
    try {
        const productsUrl = baseUrl + `products/${id}`;
        const response = await fetch(productsUrl);
        const product = await response.json();

        placeProductDetails(product);

    } catch (error) {
        console.log(error);

        warningMessage("alert-danger", error, ".container__products--single");
    }
}
// set product in form
function placeProductDetails(product) {
    nameInput.value = product.title;
    priceInput.value = product.price;
    descriptionInput.value = product.description;
    featuredCheck.checked = product.featured;
    fileLabel.innerHTML = product.image.name;
    imgDisplay.style.display = "block";
    imgDisplay.src = "http://localhost:1337" + product.image.url;
}

// display image 
fileInput.onchange = () => {
    imgDisplay.style.display = "none";
    const file = fileInput.files[0];

        fileLabel.innerHTML = file.name;
        let src = URL.createObjectURL(file);
        imgDisplay.src = src;
        imgDisplay.style.display = "block";
}

form.addEventListener("submit", getProductFormData)

function getProductFormData(event) {
    event.preventDefault();
    message.innerHTML = "";
    const formData = new FormData();
    const formElements = form.elements;

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const description = descriptionInput.value.trim();
    const featured = featuredCheck.checked;

    if (name.length === 0 || description.length === 0 || price.length === 0 || isNaN(price)) {
        return warningMessage("alert-warning", "Please enter all information", "#messageContainer");

    } else {
        const data = {
            name: name,
            price: price,
            description: description,
            featured: featured,
        };

        // Get image data
        for (let i = 0; i < formElements.length; i++) {
            const currentElement = formElements[i];
            if (!['submit', 'file'].includes(currentElement.type)) {
                data[currentElement.name] = currentElement.value;
            } else if (currentElement.type === 'file') {
                if (currentElement.files.length === 1) {
                    const file = currentElement.files[0];
                    formData.append(`files.${currentElement.name}`, file, file.name);
                } else {
                    for (let i = 0; i < currentElement.files.length; i++) {
                        const file = currentElement.files[i];
                        formData.append(`files.${currentElement.name}`, file, file.name);
                    }
                }
            }
        }

        formData.append('data', JSON.stringify(data));

        SubmitProduct(formData, id);
    }
}

// Post to strapi
async function SubmitProduct(data, id) {
    const token = getToken();
    const url = baseUrl + "products/" + id;

    const options = {
        method: "PUT",
        body: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        redirect: "follow"
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.updated_at) {
            submit.innerHTML = `Product added <i class="fas fa-check"></i>`;
            imgDisplay.style.display = "none";
            fileLabel.innerHTML = "Choose image..."
            form.reset();
            return warningMessage("alert-success", "Product edited successfully", "#messageContainer");
        }

        if (json.error) {
            return warningMessage("alert-danger", json.error, "#messageContainer");
        }

    } catch (error) {
        console.log(error);
        return warningMessage("alert-danger", error, "#messageContainer");
    }
}