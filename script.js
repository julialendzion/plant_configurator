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

  // TODO: Toggle feature in "model"

  // features[feature] = true;

  // If feature is (now) turned on:

  // - mark target as chosen (add class "chosen") v
  // - un-hide the feature-layer(s) in the #product-preview; v
  // - create featureElement and append to #selected ul v
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // - no longer mark target as chosen
  // - hide the feature-layer(s) in the #product-preview
  // - find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM

  if (features[feature] == false) {
    // feature added
    features[feature] = true;
    // TODO: More code
    console.log(`Feature ${feature} is turned on!`);
    target.classList.add("chosen");
    const previewToAnimate = document.querySelector(
      `[data-feature=${feature}]`
    );

    previewToAnimate.classList.remove("hide");
    previewToAnimate.style.left = "50%";
    swipeToCenter(feature);

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
}
function swipeToCenter(feature) {
  console.log(feature);
  const previewToAnimate = document.querySelector(`[data-feature=${feature}]`);

  const destination = document
    .querySelector("#svgDiv svg")
    .getBoundingClientRect();
  console.log("last frame", destination);

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
  console.log(feature);
  const previewToAnimate = document.querySelector(`[data-feature=${feature}]`);
  console.log(previewToAnimate);

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
