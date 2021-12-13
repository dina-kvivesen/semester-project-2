import { baseUrl } from "../settings/api.js";
import displayMessage from "./displayMessage.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");


const productsUrl = baseUrl + "products/" + id;

export default async function doFetch(url) {
  try {
    const response = await fetch(productsUrl);
    const details = await response.json();
    // console.log(details);
    document.title = details.title;
    return(details);
  } catch(error) {
    console.log(error);
    displayMessage('error', error, '.result-container');
  }
}