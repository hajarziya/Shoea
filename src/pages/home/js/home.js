import { fetchProductsApi, fetchBrandsApi } from "/src/api/products.js";
import "./HeaderSection.js";
import "./BrandsSection.js";

const BaseImagePath = "/src/img/images/";
const brands = await fetchBrandsApi();
const containerProducts = document.querySelector(".container__products");
const btnsContainer = document.querySelector(".btns__container");

let selectedBrand = "All";
async function fetchAndDisplayProducts() {
  let productsItem = "";

  const products = await fetchProductsApi({ brand: selectedBrand });
  products.forEach((product) => {
    productsItem += `<a class="product" href="/src/pages/products/details/index.html?productId=${
      product.id
    }">
    <div class="img_wrapper">
      <img src="${BaseImagePath + product.images[0]}" alt="shoes" />
    </div>
    <h3 class="product_name">${product.name}</h3>
    <p class="product_price">$ ${product.price}</p>
  </a>`;
  });
  containerProducts.innerHTML = productsItem;
}

async function fetchAndDisplaysBrands() {
  let btnsBrand = "";
  btnsBrand += `<button class="btn_barand ${
    selectedBrand === "All" ? "active" : ""
  }">All</button>`;
  brands.forEach((brand) => {
    btnsBrand += ` <button class="btn_barand ${
      selectedBrand === brand.name ? "active" : ""
    }">${brand.name}</button>`;
  });
  btnsContainer.innerHTML = btnsBrand;

  const brandButtons = document.querySelectorAll(".btn_barand");
  brandButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const brand = button.textContent;
      selectedBrand = brand;
      fetchAndDisplayProducts();
      fetchAndDisplaysBrands();
    });
  });
}

await fetchAndDisplaysBrands();
await fetchAndDisplayProducts();
