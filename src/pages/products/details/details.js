import { fetchProduct } from "/src/api/products.js";

const BaseImagePath = "/src/img/images/";
const gallery = document.querySelector(".gallery");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("productId");

const productDetails = await fetchProduct(id);

function displayPhotos() {
  try {
    let galleryItem = "";
    productDetails.images.forEach((image) => {
      galleryItem += ` <img class="detail__img" src="${
        BaseImagePath + image
      } " alt="images" />`;
    });
    gallery.innerHTML = galleryItem;
  } catch (error) {
    console.error("Error fetching and displaying photos:", error);
  }
}

displayPhotos();
