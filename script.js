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
