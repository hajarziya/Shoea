import { fetchProductApi } from "/src/api/products.js";
import { addToCartApi } from "/src/api/cart.js";

const BaseImagePath = "/src/img/images/";
const gallery = document.querySelector(".gallery__images");
const productName = document.querySelector(".name__product");
const soldCount = document.querySelector(".sold");
const reviewsCount = document.querySelector(".reviews__count");
const descriptionText = document.querySelector(".description");
const sizeWrapper = document.querySelector(".sizes__wrapper");
const colorWrapper = document.querySelector(".colors__wrapper");
const priceText = document.querySelector(".price__num");
const quantityText = document.querySelector(".quantity_num");
const minusQuantityBtn = document.querySelector(".minus");
const plusQuantityBtn = document.querySelector(".plus");
const addToCartBtn = document.querySelector(".btn__cart");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("productId");
const productDetails = await fetchProductApi(id);

const productSelectedOptions = {
  quantity: 0,
  color: "black",
  size: "42",
};

function displayPhotos() {
  let galleryItem = "";
  productDetails.images.forEach((image) => {
    galleryItem += ` <img class="detail__img" src="${
      BaseImagePath + image
    } " alt="images" />`;
  });
  gallery.innerHTML = galleryItem;
}

function displayDescriptionAndTitle() {
  productName.textContent = productDetails.name;
  soldCount.textContent = productDetails.soldCount + " sold";
  reviewsCount.textContent =
    productDetails.rate + " (" + productDetails.reviews + " reviews)";
  descriptionText.textContent = productDetails.description;
}

function displaySizes() {
  let sizeItem = "";
  productDetails.sizes.forEach((size) => {
    sizeItem += ` <button class="sizenumber ${
      productSelectedOptions.size === size ? "active" : ""
    }">${size}</button>`;
  });
  sizeWrapper.innerHTML = sizeItem;

  const sizeButtons = document.querySelectorAll(".sizenumber");
  sizeButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const size = button.textContent;
      productSelectedOptions.size = size;
      displaySizes();
    });
  });
}

function displayColors() {
  let colorItem = "";
  productDetails.colors.forEach((color) => {
    console.log(color);
    colorItem += `<button data-color=${color} class="color ${
      productSelectedOptions.color === color ? "active" : ""
    }" style="background-color: ${color}"></button>`;
  });
  colorWrapper.innerHTML = colorItem;

  const colorButtons = document.querySelectorAll(".color");
  colorButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const color = button.getAttribute("data-color");
      productSelectedOptions.color = color;
      displayColors();
    });
  });
}

function updateQuantityAndPrice() {
  quantityText.textContent = productSelectedOptions.quantity;
  if (productSelectedOptions.quantity === 0) {
    priceText.textContent = "$ " + productDetails.price;
  } else {
    priceText.textContent =
      "$ " + Number(productDetails.price) * productSelectedOptions.quantity;
  }
}

function manageQuantity() {
  minusQuantityBtn.addEventListener("click", () => {
    if (productSelectedOptions.quantity > 0) {
      productSelectedOptions.quantity--;
      updateQuantityAndPrice();
    }
  });

  plusQuantityBtn.addEventListener("click", () => {
    productSelectedOptions.quantity++;
    updateQuantityAndPrice();
  });
}

displayPhotos();
displayDescriptionAndTitle();
displaySizes();
displayColors();
manageQuantity();
updateQuantityAndPrice();

addToCartBtn.addEventListener("click", () => {
  if (productSelectedOptions.quantity > 0) {
    addToCartApi(
      id,
      productDetails.images[0],
      productDetails.name,
      productDetails.price,
      productSelectedOptions.quantity,
      productSelectedOptions.color,
      productSelectedOptions.size
    ).then(()=>{
      window.location.href="/src/pages/cart"
    });
  }
});
