import {
  fetchCartApi,
  updateCartQuantityApi,
  deleteCartApi,
} from "/src/api/cart.js";

const BaseImagePath = "/src/img/images/";

const containerProducts = document.querySelector(".container__products");
const totalNum = document.querySelector(".total__num");
const btnCheckout = document.querySelector(".btn__checkout");
const footer = document.querySelector(".footer");
const totalPriceBox = document.querySelector(".totalprice__box");
const mycartOverlayer = document.querySelector(".mycart__overlayer");
const productBox = document.querySelector(".product__box");
const cancle = document.querySelector(".cancle");
const remove = document.querySelector(".remove");

const quantityText = document.querySelector(".quantity__text");

let cartData = await fetchCartApi();
const deleteCart = await deleteCartApi;

let selectedForDelete;

function getCartItemDetails(id) {
  return cartData.find((cart) => cart.id == id);
}

function removeFromCart() {
  const cartOne = getCartItemDetails(selectedForDelete);
  productBox.innerHTML = `<div class="product__box">
  <img
    src="${BaseImagePath + cartOne.image}"
    alt="shoes"
    class="product__img"
  />
  <div class="product__detail">
    <div class="nameanddelete">
      <h3 class="name">${cartOne.name}</h3>
    </div>
    <div class="nameandcolor__pro">
      <div class="color">
        <a
          href=""
          class="color__show"
          style="background-color: grey"
        ></a>
        <h6 class="color__name">${cartOne.color} | Size=${cartOne.size}</h6>
      </div>
    </div>
    <div class="priceandreview">
      <h3 class="price">$${cartOne.price}</h3>
      <div class="quantity__box">
        <button class="btn__quantity minus" data-id="${cartOne.id}" >-</button>
        <strong class="quantity__text">${cartOne.quantity}</strong>
        <button class="btn__quantity plus" data-id="${cartOne.id}" >+</button>
      </div>
    </div>
  </div>
</div>`;
  const minus = document.querySelector(".minus");
  const plus = document.querySelector(".plus");

  minus.addEventListener("click", () => {
    let idQuantityRemoveBox = minus.getAttribute("data-id");
    const item = getCartItemDetails(idQuantityRemoveBox);
    if (item.quantity > 1) {
      item.quantity--;
    }
    updateCartQuantityApi(idQuantityRemoveBox, item.quantity);
    removeFromCart();
    displayCarts();
  });

  plus.addEventListener("click", () => {
    let idQuantityRemoveBox = plus.getAttribute("data-id");
    const item = getCartItemDetails(idQuantityRemoveBox);
    item.quantity++;
    updateCartQuantityApi(idQuantityRemoveBox, item.quantity);
    removeFromCart();
    displayCarts();
  });

  remove.addEventListener("click", () => {
    deleteCart(selectedForDelete);
    footer.style.display = "flex";
    totalPriceBox.style.display = "flex";
    mycartOverlayer.style.display = "none";
    displayCarts();
  });
  cancle.addEventListener("click", () => {
    footer.style.display = "flex";
    totalPriceBox.style.display = "flex";
    mycartOverlayer.style.display = "none";
  });
}

async function displayCarts() {
  cartData = await fetchCartApi();
  if(cartData.length===0){
    window.location.href="/src/pages/home"
  }
  let cartItem = "";
  cartData.forEach((product) => {
    cartItem += ` <div data-id="${product.productId}" class="product__box">
    <img
      src="${BaseImagePath + product.image} "
      alt="shoes"
      class="product__img"
    />
    <div class="product__detail">
      <div class="nameanddelete">
        <h3 class="name">${product.name}</h3>
        <button class="delete__icon" data-id=${product.id} >
        <img
          src="../../img/bin_delete_file_garbage_recycle_remove_trash_icon_123192.png"
          alt=""
        />
        </button>
      </div>
      <div class="nameandcolor__pro">
        <div class="color">
          <a
            href=""
            class="color__show"
            style="background-color: ${product.color}"
          ></a>
          <h6 class="color__name">${product.color} | Size = ${product.size}</h6>
        </div>
      </div>
      <div class="priceandreview">
        <h3 class="price">$ ${product.price} </h3>
        <div class="quantity__box">
          <button class="btn__quantity btn_minus" data-id=${
            product.id
          }>-</button>
          <strong class="quantity__text">${product.quantity}</strong>
          <button class="btn__quantity btn_plus" data-id=${
            product.id
          }>+</button>
        </div>
      </div>
    </div>
  </div>`;
  });
  containerProducts.innerHTML = cartItem;

  const deleteIcon = document.querySelectorAll(".delete__icon");
  deleteIcon.forEach((button) => {
    button.addEventListener("click", async (e) => {
      selectedForDelete = button.getAttribute("data-id");
      console.log(selectedForDelete);
      footer.style.display = "none";
      totalPriceBox.style.display = "none";
      mycartOverlayer.style.display = "block";
      removeFromCart();
    });
  });
  const minusButtons = document.querySelectorAll(".btn_minus");
  minusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let idData = button.getAttribute("data-id");
      const item = getCartItemDetails(idData);
      if (item.quantity > 1) {
        item.quantity--;
      }
      updateCartQuantityApi(idData, item.quantity);
      displayCarts();
    });
  });

  const plusButtons = document.querySelectorAll(".btn_plus");
  plusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let idData = button.getAttribute("data-id");
      const item = getCartItemDetails(idData);
      item.quantity++;
      updateCartQuantityApi(idData, item.quantity);
      displayCarts();
    });
  });
  function displayTotalPrice() {
    let total = 0;
    cartData.forEach((product) => {
      const itemPrice = product.price * product.quantity;
      total += itemPrice;

      totalNum.textContent = `$ ${total}`;
    });
  }
  btnCheckout.addEventListener("click", () => {
    window.location.href = "/src/pages/checkout";
  });
  displayTotalPrice();
}

displayCarts();
