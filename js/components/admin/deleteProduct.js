import warningMessage from "../warningMessage.js"
import {
    getToken
} from "../../utils/storage.js";
import {
    baseUrl
} from "../../settings/api.js"
export function toggleDeleteProduct(id) {

    const deleteButton = document.querySelector("#delete");
    deleteButton.addEventListener("click", function () {

        const messageContainer = document.querySelector("#messageContainer");
        messageContainer.style.textAlign = "center";
        warningMessage("alert-danger", `
        <p>Are you sure you want to delete this item?</p>
        <button type="button" class="btn btn-dark" id="confirmDelete">I'm sure</button>
        <button type="button" class="btn btn-outline-danger" id="cancelDelete">Cancel</button>
        `, "#messageContainer");

        const cancelDelete = document.querySelector("#cancelDelete");
        const confirmDelete = document.querySelector("#confirmDelete");

        cancelDelete.addEventListener("click", function () {
            messageContainer.style.display = "none";
        })

        confirmDelete.addEventListener("click", function () {
            deleteProduct(id);
        });
    })
}
async function deleteProduct(id) {
    const token = getToken();
    const url = baseUrl + "products/" + id;

    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        await response.json();

        submit.innerHTML = `Product deleted <i class="fas fa-check"></i>`;
        warningMessage("alert-danger", "Product deleted", "#messageContainer");
        location.href = "/admin.html";

    } catch (error) {
        console.log(error);
        return warningMessage("alert-danger", error, "#messageContainer");
    }
}