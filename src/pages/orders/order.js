import {fetchOrdersApi} from "/src/api/orders.js";
const BaseImagePath = "/src/img/images/";

const btnActive=document.querySelector('.active');
const btnCompleted=document.querySelector('.completed');
const productContainer=document.querySelector('.container__products');


async function fetchAndDisplayData(status) {
    const orders = await fetchOrdersApi(status);
    let orderItem="";
    orders.forEach(order=>{
        order.products.forEach(product=>{
            orderItem+=`<div class="product__box">
          <img
            src="${BaseImagePath+product.image}"
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
                <h6 class="color__name">${product.color} | Size= ${product.size} | Qty= ${product.quantity}</h6>
              </div>
              <p class="status">${order.status}</p>
            </div>
             <div class="priceandreview">
              <h3 class="price">$ ${product.price}</h3>
              <div class="track__box">
                <button class="btn__trackorder">Track Order</button>
              </div>
            </div>
          </div>
        </div>`
        })
    })
    productContainer.innerHTML=orderItem;
}

btnActive.addEventListener('click',()=>{
    btnActive.style.color='#000'
    btnActive.style.borderBottomColor='#000'
    btnCompleted.style.color='#959b9d'
    btnCompleted.style.borderBottomColor='#959b9d'
    fetchAndDisplayData("In Delivery")

})

btnCompleted.addEventListener('click',()=>{
    btnCompleted.style.color='#000'
    btnCompleted.style.borderBottomColor='#000'
    btnActive.style.color='#959b9d'
    btnActive.style.borderBottomColor='#959b9d'
    fetchAndDisplayData("Completed")
})

fetchAndDisplayData("In Delivery")