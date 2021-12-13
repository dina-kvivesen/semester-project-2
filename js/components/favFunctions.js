export function getExistingCart() {

const cartProducts = localStorage.getItem("cart");

if(!cartProducts) {
  return [];
} else {
  return JSON.parse(cartProducts);
  }
}