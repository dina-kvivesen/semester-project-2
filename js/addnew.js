import createMenu from "./components/common/createMenu.js";
import {
  baseUrl
} from "./settings/api.js";
import {
  getToken
} from "./utils/storage.js";
import warningMessage from "./components/warningMessage.js";

if (!getToken()) {
  location.href = "/";
}

createMenu();

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const descriptionInput = document.querySelector("#description");
const featuredCheck = document.querySelector("#featuredCheck");

const fileInput = document.querySelector("#uploadFile");
const fileLabel = document.querySelector(".custom-file-label");
const imgPreview = document.querySelector("#uploadImage");

const message = document.querySelector("#messageContainer");


// display image
fileInput.onchange = () => {
    imgPreview.style.display = "none";
    const file = fileInput.files[0];

    
        fileLabel.innerHTML = file.name;
        let src = URL.createObjectURL(file);
        imgPreview.src = src;
        imgPreview.style.display = "block";
    
}

form.addEventListener("submit", getProductFormData)

function getProductFormData(event) {
    event.preventDefault();
    message.innerHTML = "";
    const formData = new FormData();
    const formElements = form.elements;

    const title = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const description = descriptionInput.value.trim();
    const featured = featuredCheck.checked;

    if (title.length === 0 || description.length === 0 || price.length === 0 || isNaN(price)) {
        return warningMessage("alert-warning", "Please enter all information", "#messageContainer");

    } else {
        const data = {
            title: title,
            price: price,
            description: description,
            featured: featured,
        };

        // Get image data and add to formData
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
        // Add other data to formData 
        formData.append('data', JSON.stringify(data));

        trySubmitProduct(formData);
    }
}

// Post to strapi
async function trySubmitProduct(data) {
    const url = baseUrl + "products";
    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        redirect: "follow"
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            submit.innerHTML = `Product added <i class="fas fa-check"></i>`;
            imgPreview.style.display = "none";
            fileLabel.innerHTML = "Choose image..."
            form.reset();
            return warningMessage("alert-success", "Product added successfully", "#messageContainer");
        }

        if (json.error) {
            return warningMessage("alert-danger", json.error, "#messageContainer");
        }

    } catch (error) {
        console.log(error);
        return warningMessage("alert-danger", error, "#messageContainer");
    }
}

