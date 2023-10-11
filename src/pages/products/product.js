import {fetchBrandsApi, fetchProductsApi} from "/src/api/products.js";

const containerProducts = document.querySelector(".container__products");
const titlePage=document.querySelector(".title__page");
const brandContainer=document.querySelector(".btns__container");
const BaseImagePath = "/src/img/images/";
let selectedBrand = "All";

const brands = await fetchBrandsApi();
async function fetchAndDisplayProducts(){
    const urlParams = new URLSearchParams(window.location.search);
    let brand = urlParams.get("brand");
    if(brand){
        brandContainer.style.display="none";
        titlePage.textContent=brand;
    }else {
        titlePage.textContent="Most Popular";
        brand=selectedBrand;
    }
    const products = await fetchProductsApi({ brand: brand });

    if (products.length > 0) {
        let productsItem="";
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
    brandContainer.innerHTML = btnsBrand;

    const brandButtons = document.querySelectorAll(".btn_barand");
    brandButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            selectedBrand = button.textContent;
            fetchAndDisplayProducts();
            fetchAndDisplaysBrands();
        });
    });
}
fetchAndDisplaysBrands();
fetchAndDisplayProducts()