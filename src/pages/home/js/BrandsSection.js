

import { fetchBrandsApi } from "/src/api/products.js";
const brandContainer = document.querySelector(".barand__container");

const brands = await fetchBrandsApi();

let brandsItems = "";
brands.forEach((brand, index) => {
    brandsItems += `<div class="barand-wrapper">
       <a href="/src/pages/products/index.html?brand=${index<7?brand.name:""}">
        <div class="barand_img">
          <img src=${brand.icon} alt="brand" />
        </div>
        <h3 class="barand_name">${brand.name}</h3>
        </a>
        </div>`;
});
brandContainer.innerHTML = brandsItems;
