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
    document
      .querySelector(`[data-feature=${feature}]`)
      .classList.remove("hide");
    const selectedFeatureImg = document.createElement("img");
    selectedFeatureImg.id = `${feature}Created`;
    selectedFeatureImg.src = `assets/${feature}-narrow.png`;
    selectedFeatureImg.alt = capitalize(feature);
    selectedFeatureImg.style.height = "12vw";
    document.querySelector("#selected ul").appendChild(selectedFeatureImg);
    animateFeatureForwards(feature);

    // TODO: More code
  } else {
    // feature removed
    features[feature] = false;

    console.log(`Feature ${feature} is turned off!`);
    target.classList.remove("chosen");
    document.querySelector(`[data-feature=${feature}]`).classList.add("hide");
    animateFeatureBackwards(feature);

    // document.querySelector(`#${feature}Created`).remove();
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
// function createFeatureElement(feature) {
//   const li = document.createElement("li");
//   li.dataset.feature = feature;

//   const img = document.createElement("img");
//   img.src = `images/feature_${feature}.png`;
//   img.alt = capitalize(feature);

//   li.append(img);

//   return li;
// }

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}

function animateFeatureForwards(feature) {
  const boxToAnimate = document.querySelector(`img#${feature}Created`);
  console.log(boxToAnimate);

  const firstPosition = document.querySelector(
    `#options [data-feature=${feature}] img`
  );
  console.log(firstPosition);

  //FIRST FRAME
  const firstFrame = firstPosition.getBoundingClientRect();
  console.log(firstFrame);

  // LAST FRAME
  const lastFrame = boxToAnimate.getBoundingClientRect();
  console.log("last frame", lastFrame);

  //POSITION

  const deltaX = firstFrame.left - lastFrame.left;
  const deltaY = firstFrame.top - lastFrame.top;

  boxToAnimate.animate(
    //   //KEYFRAMES

    [
      {
        transformOrigin: "top left",
        transform: `translate(${deltaX}px, ${deltaY}px)`,
      },
      { transformOrigin: "top left", transform: "none" },
    ],
    //PROPERTIES

    { duration: 1000, easing: "ease-in-out" }
  );
}
function animateFeatureBackwards(feature) {
  const boxToAnimate = document.querySelector(`img#${feature}Created`);
  const lastPosition = document.querySelector(
    `#options [data-feature=${feature}] img`
  );
  const firstFrame = boxToAnimate.getBoundingClientRect();
  const lastFrame = lastPosition.getBoundingClientRect();
  console.log("first positon", firstFrame);
  console.log("last position", lastFrame);
  const deltaX = lastFrame.left - firstFrame.left;
  console.log("deltaX", deltaX);
  const deltaY = lastFrame.top - firstFrame.top;
  console.log("deltaY", deltaY);

  boxToAnimate.animate(
    //   //KEYFRAMES

    [
      {
        transformOrigin: "top left",
        transform: "none",
      },
      {
        transformOrigin: "top left",
        transform: `translate(${deltaX}px, ${deltaY}px)`,
      },
    ],
    //PROPERTIES

    { duration: 1000, easing: "ease-in-out" }
  );
}
