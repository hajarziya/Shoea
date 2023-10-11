import {createOrderApi} from "/src/api/orders.js";
import {clearCartApi} from "/src/api/cart.js";

const btnConfirmPayment=document.querySelector(".btn__gopayment");
const successOverlay=document.querySelector(".success__overlayer")

btnConfirmPayment.addEventListener('click',()=>{
    console.log("click")
    const checkoutData=localStorage.getItem("checkout");
    createOrderApi(checkoutData).then(()=>{
        localStorage.removeItem("checkout");
        clearCartApi();
        successOverlay.style.display="block"
    })
})
