const container = document.querySelector(".container");
const container_bg_2 = document.querySelector(".container_bg_2");
const container_three = document.querySelector(".container_three");
const buttonNext = document.querySelector(".btn__next");
const slidOne = document.querySelector(".slid__one");
const slidTwo = document.querySelector(".slid__two");
const slidThree = document.querySelector(".slid__three");
setTimeout(function () {
  container.style.display = "none";
  container_bg_2.style.display = "block";
}, 3000);

setTimeout(function () {
  container_bg_2.style.display = "none";
  container_three.style.display = "block";
}, 6000);

let currentSlide = 1;

buttonNext.addEventListener("click", () => {
  slidOne.style.display = "none";
  slidTwo.style.display = "none";
  slidThree.style.display = "none";

  currentSlide++;

  if (currentSlide > 3) {
    currentSlide = 1;
  }

  if (currentSlide === 1) {
    slidOne.style.display = "block";
  } else if (currentSlide === 2) {
    slidTwo.style.display = "block";
  } else if (currentSlide === 3) {
    slidThree.style.display = "block";
    buttonNext.textContent = "Get Started";
    window.location.href = "../../pages/login/index.html";
  }
});
