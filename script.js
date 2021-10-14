"use strict";
// The model of all features
const features = {
  pothos: false,
  cactus: false,
  suculent: false,
  rope: false,
  stand: false,
  basket: false,
};

document.addEventListener("DOMContentLoaded", start);
let elementToPaint = [];

$(document).on("change", "input[type=color]", function () {
  this.parentNode.style.backgroundColor = this.value;
});

async function start() {
  let response = await fetch("empty_pot-01.svg");
  let mySvgData = await response.text();
  document.querySelector("div#svgDiv").innerHTML = mySvgData;
  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));
  init();
}

function init() {
  console.log("init");
  document.querySelectorAll(".g_to_interact").forEach((item) => {
    item.addEventListener("click", (event) => {
      setElement(event.target);
      event.target.style.fill = "grey";
      console.log(event.target);
    });
  });

  document.querySelectorAll("rect").forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log(elementToPaint);
      //fill din't work as event.target.fill --> item.getAttribute("fill")); solved it
      setColor(event.target.getAttribute("fill"));
    });
  });
  document.querySelector("#colorInput").addEventListener("input", choseColor);
  document.querySelector("#refresh").addEventListener("click", refreshPlant);
  document
    .querySelector("#refreshAddon")
    .addEventListener("click", refreshAddons);
  document
    .querySelector("#refresh_button")
    .addEventListener("click", refreshColor);
}

function choseColor(event) {
  setColor(event.target.value);
  document.querySelector("label").style.backgroundColor = event.target.value;
}

function setElement(element) {
  elementToPaint.push(element);
  console.log(elementToPaint);
}

function setColor(color) {
  console.log(color);
  for (let i = 0; i < elementToPaint.length; i++) {
    elementToPaint[i].style.fill = color;
  }

  elementToPaint = [];
}
//TOGGLING

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  const sort = target.dataset.sort;
  const previewToAnimate = document.querySelector(`[data-feature=${feature}]`);
  if (features[feature] == false) {
    // feature added
    features[feature] = true;
    previewToAnimate.classList.add("chosen");
    previewToAnimate.classList.remove("hide");
    previewToAnimate.style.left = "35%";
    swipeToCenter(feature);
  } else if (features[feature] == true) {
    // feature removed
    features[feature] = false;

    // previewToAnimate.removeAttribute("class");
    previewToAnimate.classList.add("hide");
    // previewToAnimate.style.left = "0%";
    // swipeToEnd(feature);
  }
  document
    .querySelectorAll(`#preview [data-sort=${sort}]`)
    .forEach((displayed_feature) => {
      // let currentlyChosen = document.querySelector(".chosen");
      //   console.log(currentlyChosen);
      // swipeToEnd(displayed_feature.dataset.feature);
      // console.log("displayed feature is", displayed_feature.dataset.feature);
      // displayed_feature.classList.remove("chosen");
      displayed_feature.classList.add("hide");
      // console.log(`all ${sort} is removed`);
    });
  // let currentlyChosen = document.querySelector(".chosen");
  // console.log(currentlyChosen);
  previewToAnimate.classList.remove("hide");
}

function swipeToCenter(feature) {
  const previewToAnimate = document.querySelector(`[data-feature=${feature}]`);

  const destination = document
    .querySelector("#svgDiv svg")
    .getBoundingClientRect();
  console.log("last frame", destination);

  previewToAnimate.animate(
    //KEYFRAMES

    [
      {
        transformOrigin: "top left",
        transform: "none",
      },
      {
        transformOrigin: "top left",
        transform: `translateX(-${destination.width / 2}px)`,
      },
    ],
    //PROPERTIES

    {
      duration: 1000,
      easing: "ease-in-out",
      iterations: "1",
      fill: "forwards",
    }
  );
}

function refreshPlant() {
  document
    .querySelectorAll(`#preview [data-sort="plants"]`)
    .forEach((element) => {
      element.classList.remove("chosen");
      element.classList.add("hide");
      features[element.dataset.feature] = false;
    });
}

function refreshAddons() {
  document
    .querySelectorAll(`#preview [data-sort="addOn"]`)
    .forEach((element) => {
      element.classList.remove("chosen");
      element.classList.add("hide");
      features[element.dataset.feature] = false;
    });
}

function refreshColor() {
  let defaultColor = "white";

  document.querySelectorAll(".g_to_interact path").forEach((paint) => {
    console.log(paint);
    paint.style.fill = defaultColor;
  });
}
