import "./style.css";
import firstImage from "./images/1.png";
import secondImage from "./images/2.png";
import thirdImage from "./images/3.png";
import fourthImage from "./images/4.png";

// select slider div and load all images
const sliderDiv = document.querySelector("#slider");
const allImageSources = [firstImage, secondImage, thirdImage, fourthImage];
const numberOfImages = allImageSources.length;
const loadImages = (function loadImages() {
  allImageSources.forEach((imageSrc, index) => {
    const img = new Image();
    img.src = imageSrc;
    img.setAttribute("data-index", index);
    img.classList.add("slider-image");
    img.classList.add("active");
    if (index > 0) {
      img.classList.add("hide");
    }
    sliderDiv.appendChild(img);
  });
})(allImageSources);

// TODO: apply transition to the images
const changeImage = function makeAnotherImageActiveAndHideTheRest(
  currentImageIndex,
  // direction + 1: right, - 1: left
  direction,
) {
  let currentIndex = currentImageIndex;
  if (currentIndex === numberOfImages - 1 && direction === 1) {
    currentIndex = -1;
  }
  if (currentIndex === 0 && direction === -1) {
    currentIndex = numberOfImages;
  }
  const allImages = document.querySelectorAll(".slider-image");
  Array.from(allImages).forEach((image, index) => {
    image.classList.add("hide");
    image.classList.remove("active");
    if (index === parseInt(currentIndex, 10) + direction) {
      image.classList.add("active");
      image.classList.remove("hide");
    }
  });
};
const prevButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
prevButton.addEventListener("click", () => {
  const image = document.querySelector(".active");
  image.classList.add("left");
  const currentIndex = parseInt(image.getAttribute("data-index"), 10);
  setTimeout(() => {
    changeImage(currentIndex, -1);
    image.classList.remove("left");
  }, "800");
});
nextButton.addEventListener("click", () => {
  const image = document.querySelector(".active");
  image.classList.add("right");
  const currentIndex = parseInt(image.getAttribute("data-index"), 10);
  setTimeout(() => {
    changeImage(currentIndex, 1);
    image.classList.remove("right");
  }, "800");
});
