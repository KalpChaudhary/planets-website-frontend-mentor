"use strict";
// import "regenerator-runtime/runtime";

// import rawData from "./data.json"
// console.log(rawData);

import destinationImages from "./assets/destination/*.png";

console.log(destinationImages);

//? Menu active- deactive logic
const menuBtn = document.querySelector("#menuBtn");
const closeBtn = document.querySelector("#closeBtn");
const navbarLinks = document.querySelector(".navbar__links");
//?-----------------------------

//? Styling btn explore on click
const btnExplore = document.querySelector("#btnExplore");

//? destination link active class
const destinationLinkParentEl = document.querySelector(".destination-links");
const planet = document.querySelectorAll(".planet");

//? change data when link is clicked
const planetImg = document.querySelector(".planet-img");
const planetName = document.querySelector(".planet-name");
const planetInfo = document.querySelector(".planet-description");
const planetDistance = document.querySelector(".planet-distance");
const planetDuration = document.querySelector(".planet-traveltime");

//? crew active class

const navigationParentEl = document.querySelector(".navigation");
const dotClass = document.querySelectorAll(".dot");

//? change data when link is clicked


const crewProfile = document.querySelector('#crewProfile');
const crewPosition = document.querySelector('#crewPosition');
const crewName = document.querySelector('#crewName');
const crewDescription = document.querySelector('#crewDescription');


//? change tech data on click 

const techNav = document.querySelector('.tech__navigation');

const techImg = document.querySelector('#techImg');
const sourceTagImg = document.querySelector('#sourceTagImg');
const techName = document.querySelector('#techName');
const techDescription = document.querySelector('#techDescription');

const techSlide = document.querySelectorAll('.tech-slide')

const windowWidth = window.matchMedia("(min-width:1100px)");
//?-------------------------------



menuBtn.addEventListener("click", linksShow);
closeBtn.addEventListener("click", linksHide);

//? transfer link active class on clicked link
if (destinationLinkParentEl) {
  destinationLinkParentEl.addEventListener("click", addActiveClass);
}
if (destinationLinkParentEl) {
  destinationLinkParentEl.addEventListener("click", changePlanetData);
}

//? transfer link active class in crew

if (navigationParentEl) {
  navigationParentEl.addEventListener("click", changeActiveCrewSlide);
}

//? transfer link active class in tech

if(techNav){
  techNav.addEventListener("click", changeActiveTechSlide)
}




function linksShow() {
  navbarLinks.classList.toggle("active-display");

  setTimeout(() => {
    navbarLinks.classList.toggle("active-visibility");
  }, 20);
}
function linksHide() {
  navbarLinks.classList.toggle("active-visibility");

  setTimeout(() => {
    navbarLinks.classList.toggle("active-display");
  }, 100);
}


function addActiveClass(e) {
  const linkEl = e.target.parentNode;
  if (linkEl.classList.contains("active")) {
    return;
  } else {
    planet.forEach((el) => {
      el.classList.remove("active");
    });
    linkEl.classList.add("active");
  }
}

function changeActiveCrewSlide(e) {
  const dotEl = e.target.closest(".dot");
  if(!dotEl) return;
  const id = dotEl.dataset.id;


  if (dotEl.classList.contains("active")) return;

  dotClass.forEach((el) => {
    el.classList.remove("active");
  });

  dotEl.classList.add("active");

  changeActiveCrewInfo(id);
}


let techId = 0;

 function changeActiveTechSlide(e){
  const techActiveSlide = e.target.closest(".tech-slide");
  if(!techActiveSlide) return;

  if (techActiveSlide.classList.contains("active")) return;

  techSlide.forEach((el) => {
    el.classList.remove("active");
  });

  techActiveSlide.classList.add("active");

  let id = +techActiveSlide.innerHTML;
  id -=1;
  techId = id;

  changeActiveTechInfo(id);

}

const fetchData = async function () {
  try {
    const rawData = await fetch("./data.json");
    return await rawData.json();
    // const rawData = await import("./data.json");
    // return rawData;
  } catch (err) {
    console.log(err);
  }
};



async function changePlanetData(e) {
  const curretEl = e.target.innerHTML;
  const { destinations: destination } = await fetchData();
  // const { destinations: destination } = fetchData();

  destination.filter((el) => {
    if (el.name === curretEl) {
      const destImg = el.name.toLowerCase();
      console.log(destImg)
      console.log(destinationImages[`image-${destImg}`]);
      // console.log(el);
      planetName.innerHTML = el.name;
      planetImg.src = `${destinationImages[`image-${destImg}`]}`;
      // planetImg.src = el.images.png;
      planetInfo.innerHTML = el.description;
      planetDistance.innerHTML = el.distance;
      planetDuration.innerHTML = el.travel;
    } else {
      return;
    }
  });
}

async function changeActiveCrewInfo(id) {

  const {crew} = await fetchData();

  crew.filter((el) => {
    if (el.id === +id) {
      crewName.innerHTML = el.name;
      crewPosition.innerHTML = el.role;
      crewDescription.innerHTML = el.bio;
      crewProfile.src= el.images.webp
    } else {
      return;
    }
  });
}




async function changeActiveTechInfo(id){
  const {technology} = await fetchData();

  techName.innerHTML = technology[id].name;
  techDescription.innerHTML = technology[id].description;

  techId = id;
  changeImages(windowWidth,techId);
}



async function changeImages(x, id = techId) {

  const {technology} = await fetchData();
  if(!techImg) return;
  if(x.matches){

    techImg.src = technology[id].images.portrait;
    sourceTagImg.srcset =technology[id].images.portrait;
  }else{
    techImg.src = technology[id].images.landscape;
  }
}

changeImages(windowWidth,techId);
windowWidth.addListener(changeImages);



// const fetchDataTemp = async function () {
//   try {
//     const rawData = await import("./data.json");
//     console.log(rawData);
//   } catch (err) {
//     console.log(err);
//   }
// };

// fetchDataTemp()

// const dataTemp = async function () {

//   const data = await fetchDataTemp();
//   console.log(data);
// }

// dataTemp();

