"use strict";
// The model of all features
const features = {
  pothos: false,
  cactus: false,
  lilly: false,
};

document.addEventListener("DOMContentLoaded", start);
let elementToPaint = [];

async function start() {
  let response = await fetch("empty_pot.svg");
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
  console.log(sort);
  if (features[feature] == false) {
    // feature added
    features[feature] = true;
    // TODO: More code
    console.log(`Feature ${feature} is turned on!`);

    //CHECK IF A CLASS IS PRESENT
    // let currentlyChosen = document.getElementsByClassName("chosen");
    // console.log(currentlyChosen.length);
    // if (currentlyChosen.length > 0) {
    //   console.log(currentlyChosen.length);
    // const elementToremove = document.querySelector(".chosen");
    // removeOther(elementToremove.dataset.feature);
    // } else {
    target.classList.add("chosen");

    previewToAnimate.classList.remove("hide");
    previewToAnimate.style.left = "50%";
    swipeToCenter(feature);

    // }

    // TODO: More code
  } else {
    // feature removed
    features[feature] = false;

    console.log(`Feature ${feature} is turned off!`);
    target.classList.remove("chosen");
    const previewToAnimate = document.querySelector(
      `[data-feature=${feature}]`
    );
    previewToAnimate.style.left = "0%";
    swipeToEnd(feature);
  }
  document
    .querySelectorAll(`#preview [data-sort=${sort}]`)
    .forEach((displayed_feature) => {
      // let currentlyChosen = document.querySelector(".chosen");
      // console.log(currentlyChosen);
      // swipeToEnd(displayed_feature.dataset.feature);
      // console.log("displayed feature is", displayed_feature.dataset.feature);
      displayed_feature.classList.add("hide");
      console.log(`all ${sort} is removed`);
    });
  let currentlyChosen = document.querySelector(".chosen");
  console.log(currentlyChosen);
  previewToAnimate.classList.remove("hide");
}

function swipeToCenter(feature) {
  console.log(feature);
  const previewToAnimate = document.querySelector(`[data-feature=${feature}]`);

  const destination = document
    .querySelector("#svgDiv svg")
    .getBoundingClientRect();
  console.log("last frame", destination);
  setToFalse(previewToAnimate.dataset.feature);
  // const deltaX = firstFrame.right - lastFrame.left;
  // console.log(deltaX);

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

function swipeToEnd(feature) {
  // console.log("removing previous");
  console.log(feature);
  const previewToAnimate = document.querySelector(`[data-feature=${feature}]`);
  // console.log(previewToAnimate);

  const firstFrame = document
    .querySelector("#svgDiv svg")
    .getBoundingClientRect();

  const destination = document
    .querySelector("#svgDiv svg")
    .getBoundingClientRect();
  console.log("last frame", destination);

  previewToAnimate.animate(
    //KEYFRAMES

    [
      {
        transformOrigin: "center",
        transform: "none",
      },
      {
        transformOrigin: "center",
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
  previewToAnimate.addEventListener("animationend", function () {
    console.log("hide");
  });
}
// function removeOther(feature) {
//   features[feature] = false;
//   console.log(feature);
//   document
//     .querySelector(`[data-feature=${feature}]`)
//     .classList.remove("chosen");
//   swipeToEnd(feature);
// }
function setToFalse(feature) {
  features[feature] = false;
}
