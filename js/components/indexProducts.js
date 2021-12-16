export default function createHtml(product, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = "";

    for (let i = 0; i < product.length; i++) {

        const productImageUrl = "http://localhost:1337" + product[i].image.url;
        let featured = "";
        if (product[i].featured === null || !product[i].featured) {
            featured = false;
        } else {
            featured = true;
        }

        if (featured) {
            element.innerHTML += `

            <div class="col mb-4 single__product">
            <div class="card  h-100">
                <div class="card--featured">
                    <a href="product.html?id=${product[i].id}"><img src="${productImageUrl}" class="card-img-top" alt="${product[i].title} "></a>
                    <p>Featured Product</p>
                </div>
                <div class="d-flex flex-column justify-content-between">
                    <div class="card-body">
                        <h4>${product[i].title}</h4>
                        <p class="card-text">${product[i].price} kr</p>
                    </div>
                    <div class="card-footer w-100">
                        <a class="view-details-btn" href="product.html?id=${product[i].id}">View details</a>
                    </div>
                </div>
            </div>
            `;
        }
    }

}