import { fetchCartApi } from "/src/api/cart.js";
import {SHIPPING_METHOD} from "./choose_shipping/consts.js";
const cartData = await fetchCartApi();

let discount=0;
const containerOrderlist = document.querySelector(".container__orderlist");
const locationName=document.querySelector(".location__name");
const shippingBox=document.querySelector(".shipping__box");
const numAmount=document.querySelector(".num__amount");
const shippingAmount=document.querySelector(".shipping__amount");
const discountAmount=document.querySelector(".num__Promo");
const totalAmount=document.querySelector(".total__amount");
const paymentBtn=document.querySelector(".btn__gopayment");
const promoInput=document.querySelector(".promo");
const addPromoBtn=document.querySelector(".btn__add");
const clearPromo=document.querySelector(".discountoff .clear");
const discountView=document.querySelector(".discountoff");

let selectedMethod;
const selectedAddress =localStorage.getItem("address")||"Home";
locationName.textContent=selectedAddress;

const checkoutData ={
  address:selectedAddress,
  shippingMethod:"",
  total:"",
  promo:'',
  products:cartData,
  status:"In Delivery"
}


const BaseImagePath = "/src/img/images/";

function displayOrderList() {
  let cartItem = "";
  cartData.forEach((product) => {
    cartItem += `<div class="product__box">
  <img
    src="${BaseImagePath + product.image}"
    alt="shoes"
    class="product__img"
  />
  <div class="product__detail">
    <div class="nameanddelete">
      <h3 class="name">${product.name}</h3>
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
      <h3 class="price">$${Number(product.price)}</h3>
      <div class="quantity__box">
        <strong>${product.quantity}</strong>
      </div>
    </div>
  </div>
  </div>
`;
  });
  containerOrderlist.innerHTML = cartItem;
}

function displayAmountPrice() {
  let amount = 0;
  cartData.forEach((product) => {
    const itemPrice = product.price * product.quantity;
    amount += itemPrice;
  });
  numAmount.textContent = `$${amount}`;
  const calculatedDiscount=(amount*discount).toFixed(0);
  discountAmount.textContent="$"+calculatedDiscount;
  const total=Number(amount)-Number(calculatedDiscount)+Number(selectedMethod.price);
  totalAmount.textContent="$"+total;
  checkoutData.promo=calculatedDiscount;
  checkoutData.total=total;
}

function displayShipping(){
  if(localStorage.getItem("shipping-method")){
    selectedMethod=JSON.parse(localStorage.getItem("shipping-method"))
  }else {
    selectedMethod=SHIPPING_METHOD[0];
  }
  checkoutData.shippingMethod=selectedMethod;
  shippingBox.innerHTML=` <div class="shipping__row"><img
            src="src/${selectedMethod.icon}"
            alt="car"
            class="shipping__icon"
          />
          <h3 class="shipping__text">${selectedMethod.title}</h3>
          </div>
          <div class="shipping__row">
          <h3 class="shipping__price">$ ${selectedMethod.price}</h3>
          <a href="/src/pages/checkout/choose_shipping/index.html">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </a></div>`
  shippingAmount.textContent="$"+selectedMethod.price
}

displayShipping()
displayAmountPrice()
displayOrderList();


paymentBtn.addEventListener("click",()=>{
  localStorage.setItem("checkout",JSON.stringify(checkoutData));
  window.location.href="/src/pages/checkout/payment_methods"
})

let promoCode="";
promoInput.addEventListener("change",(e)=>{
    promoCode=e.target.value;
})
addPromoBtn.addEventListener("click",()=>{
  promoInput.style.display="none";
  discountView.style.display="flex";
  addPromoBtn.style.display="none"
  discount=0.3;
  displayAmountPrice();
})

clearPromo.addEventListener("click",()=>{
  promoInput.style.display="flex";
  discountView.style.display="none";
  discount=0;
  addPromoBtn.style.display="block"
  displayAmountPrice();
})