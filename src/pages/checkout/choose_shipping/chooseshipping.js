import {SHIPPING_METHOD} from "./consts.js";

const shippingContainer=document.querySelector(".shipping__address--container");
let selectedMethod=SHIPPING_METHOD[0];

document.addEventListener("DOMContentLoaded", function () {

    let shippingItems=""
    SHIPPING_METHOD.forEach(item=>{
        shippingItems+=`<div class="address__box">
          <div class="location__icon--wrapper">
            <img src=${item.icon} alt="" />
          </div>
          <div class="location__wrapper">
            <h3 class="location__name">${item.title}</h3>
            <h6 class="location__address">${item.description}</h6>
          </div>
          <h3 class="price">$${item.price}</h3>
          <input ${item.title===selectedMethod.title?"checked":""} class="checkbox" type="radio" name="radio" data-title=${item.title} />
        </div>`
    })
    shippingContainer.innerHTML=shippingItems;
    const applyButton = document.querySelector(".btn__gopayment");
    const checkBoxes = document.querySelectorAll(".checkbox");
    checkBoxes.forEach(checkbox=>checkbox.addEventListener("change",(e)=>{
        const data_title=checkbox.getAttribute("data-title");
        selectedMethod=SHIPPING_METHOD.find(it=>it.title===data_title);
        localStorage.setItem("shipping-method",JSON.stringify(selectedMethod));
    }))

    applyButton.addEventListener("click", function () {
        window.location.href = `/src/pages/checkout`;
    });
});
