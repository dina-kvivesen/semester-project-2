import { baseUrl } from "../settings/api.js";
import displayMessage from "./displayMessage.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");


const productsUrl = baseUrl + "products/";

export default async function doFetch(url) {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();
    // console.log(json);
    return json;
  } catch(error) {
    console.log(error);
    displayMessage('error', error, '.result-container');
  }
}