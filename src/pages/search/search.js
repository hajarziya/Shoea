import { fetchProductsApi } from "/src/api/products.js";

const BaseImagePath = "/src/img/images/";
const inputSearch = document.querySelector(".input__search");
const containerProducts = document.querySelector(".container__products");
const resultsfor = document.querySelector(".resultsfor");
const notfound = document.querySelector(".notfound");
const clearAllBtn = document.querySelector(".clearall");
const recentSearchesDiv = document.querySelector(".recent__wrapper");
let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
function updateRecentSearches() {

  recentSearchesDiv.innerHTML = "";
  recentSearches.forEach((searchQuery, index) => {
    const recentItemDiv = document.createElement("button");
    recentItemDiv.classList.add("recent__item");
    recentItemDiv.addEventListener("click",()=>{
      inputSearch.value=searchQuery;
      fetchAndDisplayProducts(searchQuery);
    })

    const recentItemTitle = document.createElement("h3");
    recentItemTitle.textContent = searchQuery;

    const deleteIcon = document.createElement("icon");
    deleteIcon.classList.add("delete__recent");
    deleteIcon.innerHTML = '<ion-icon name="close"></ion-icon>';

    deleteIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      recentSearches.splice(index, 1);
      updateRecentSearches();
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    });

    recentItemDiv.appendChild(recentItemTitle);
    recentItemDiv.appendChild(deleteIcon);
    recentSearchesDiv.appendChild(recentItemDiv);
  });
}

async function fetchAndDisplayProducts(inputValue) {
  let productsItem = "";

  const products = await fetchProductsApi({ name: inputValue });
  if (products.length > 0) {
    resultsfor.textContent = `Results for ${inputValue}`;
    notfound.style.display = "none";
    products.forEach((product) => {
      productsItem += `<a class="product" href="/src/pages/products/details/index.html?productId=${
          product.id
      }">
        <div class="img_wrapper">
          <img src="${BaseImagePath + product.images[0]}" alt="shoes" />
        </div>
        <h3 class="product_name">${product.name}</h3>
        <div class="sold__wrapper">
          <img src="/src/img/images/star.png" alt="star" class="star__icon" />
          <h3 class="num_star">${product.rate}</h3>
          <div class="sold">${product.soldCount}</div>
        </div>
        <p class="product_price">$${product.price}</p>
</a>`;
    });
    containerProducts.style.display="flex"
    containerProducts.innerHTML = productsItem;
    recentSearchesDiv.style.display='none'
  } else if (products.length === 0) {
    resultsfor.textContent = `Results for ${inputValue}`;
    notfound.style.display = "flex";
    recentSearchesDiv.style.display='none'
    containerProducts.style.display = "none";
  }
}
inputSearch.addEventListener("keyup", async function (event) {
  if (event.key === "Enter") {
    const inputValue = inputSearch.value.trim();

    if (inputValue !== "") {
      recentSearches.unshift(inputValue);
      if (recentSearches.length > 10) {
        recentSearches.pop();
      }
      updateRecentSearches();
      localStorage.setItem("recentSearches",JSON.stringify(recentSearches))
    }
    fetchAndDisplayProducts(inputValue);
  }
});

updateRecentSearches();
clearAllBtn.addEventListener("click",()=>{
  localStorage.setItem("recentSearches", JSON.stringify([]));
  recentSearches=[];
  notfound.style.display = "none";
  updateRecentSearches()
})