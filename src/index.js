import "./style.css";
import firstImage from "./images/1.png";
import secondImage from "./images/2.png";
import thirdImage from "./images/3.png";
import fourthImage from "./images/4.png";
import leftImage from "./images/left.png";
import rightImage from "./images/right.png";
// Function to add event listener
function addEventListenerWithTracking(element, event, callback) {
  if (!element._eventListeners) {
    element._eventListeners = {};
  }
  if (!element._eventListeners[event]) {
    element._eventListeners[event] = [];
  }
  element._eventListeners[event].push(callback);
  element.addEventListener(event, callback);
}

// Function to remove all event listeners
function removeAllEventListeners(element, event) {
  if (element._eventListeners && element._eventListeners[event]) {
    element._eventListeners[event].forEach((callback) => {
      element.removeEventListener(event, callback);
    });
    element._eventListeners[event] = [];
  }
}
let currentIndex = 0;
const allImageSources = [firstImage, secondImage, thirdImage, fourthImage];
const numberOfImages = allImageSources.length;
// TODO: make the slider look nicer and add circles
const circlesDiv = document.querySelector("#circles");
const showCircles = (function createCirclesAndLinkThemToTheImages() {
  circlesDiv.innerHTML = "";
  allImageSources.forEach((image, index) => {
    const circle = document.createElement("input");
    circle.setAttribute("type", "radio");
    circle.setAttribute("data-index", index);
    circle.setAttribute("name", "current-image");
    circle.classList.add("checkmark");
    removeAllEventListeners(circle, "click");
    addEventListenerWithTracking(circle, "click", () => {
      loadImages(allImageSources, index);
    });
    circlesDiv.appendChild(circle);
  });
})();
const allCircles = document
  .querySelector("#circles")
  .getElementsByTagName("input");
// select slider div and load all images
const sliderDiv = document.querySelector("#slider");
const prevButton = document.querySelector("#previous");
prevButton.innerHTML = `<img src="${leftImage}">`;
const nextButton = document.querySelector("#next");
// apply transition to the images
const changeImage = function makeAnotherImageActiveAndHideTheRest(
  currentImageIndex = currentIndex,
  // direction + 1: right, - 1: left
  direction = 1,
) {
  currentIndex = currentImageIndex;
  if (currentIndex === numberOfImages - 1 && direction === 1) {
    currentIndex = -1;
  }
  if (currentIndex === 0 && direction === -1) {
    currentIndex = numberOfImages;
  }
  if (direction === 1) {
    allCircles[currentIndex + 1].checked = true;
  } else {
    allCircles[currentIndex - 1].checked = true;
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
nextButton.innerHTML = `<img src="${rightImage}">`;
prevButton.addEventListener("click", () => {
  const image = document.querySelector(".active");
  image.classList.add("left");
  currentIndex = parseInt(image.getAttribute("data-index"), 10);
  setTimeout(() => {
    changeImage(currentIndex, -1);
    image.classList.remove("left");
  }, "800");
});
nextButton.addEventListener("click", () => {
  const image = document.querySelector(".active");
  image.classList.add("right");
  currentIndex = parseInt(image.getAttribute("data-index"), 10);
  setTimeout(() => {
    changeImage(currentIndex, 1);
    image.classList.remove("right");
  }, "800");
});
const loadImages = function loadImages(listOfImages, starter) {
  sliderDiv.innerHTML = "";
  listOfImages.forEach((imageSrc, index) => {
    const img = new Image();
    img.src = imageSrc;
    img.setAttribute("data-index", index);
    img.classList.add("slider-image");
    img.classList.add("hide");
    if (index === starter) {
      allCircles[index].checked = true;
      currentIndex = index;
      img.classList.remove("hide");
      img.classList.add("active");
    }
    sliderDiv.appendChild(img);
  });
};

loadImages(allImageSources, 0);
// eslint-disable-next-line prefer-arrow-callback, func-names
setInterval(function () {
  changeImage(currentIndex, 1);
  currentIndex += 1;
}, "5000");
