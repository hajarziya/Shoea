import { fetchBrandsApi } from "/src/api/products.js";
const brandContainer = document.querySelector(".barand__container");

const brands = await fetchBrandsApi();

let brandsItems = "";
brands.forEach((brand, index) => {
  if (index < 8) {
    brandsItems += `<div class="barand-wrapper">
       <a href="/src/pages/products?brand=${brand.name}">
        <div class="barand_img">
          <img src=${brand.icon} alt="brand" />
        </div>
        <h3 class="barand_name">${brand.name}</h3>
        </a>
        </div>`;
  } else if (index === 8) {
    brandsItems += `<div class="barand-wrapper">
        <div class="barand_img">
          <img src="/src/img/more.png" alt="brand" />
        </div>
        <h3 class="barand_name">More</h3>
        </div>`;
  }
});
brandContainer.innerHTML = brandsItems;
