"use strict";

// Fetching the data from got.js

let charData = [];
let filteredChars = [];

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach((character) => charData.push(character));
    sortAndFilterChars(charData);
  } catch (error) {
    console.error(error);
  }
};

const sortAndFilterChars = (array) => {
  filteredChars = array
    .filter((char) => !char.hasOwnProperty("dead"))
    .sort((a, b) => {
      const x = a.name;
      const y = b.name;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  createChars(filteredChars);
};

getData("./json/got.json");

// Selectors

const imgContainer = document.querySelector(".img--container");
let characterContainer;

const createChars = (array) => {
  array.forEach((char, i) => {
    const charDiv = document.createElement("div");
    const charImg = document.createElement("img");
    const charName = document.createElement("div");

    charDiv.classList.add("charDiv");
    charName.classList.add("charName");

    charDiv.appendChild(charImg);
    charDiv.appendChild(charName);

    imgContainer.appendChild(charDiv);

    charImg.setAttribute("src", char.portrait);
    charName.innerHTML = char.name;

    characterContainer = document.querySelectorAll(".charDiv");
    generateListeners(characterContainer, i);
  });
};

const generateListeners = (array, index) => {
  array[index].addEventListener("click", () => {
    showCharacter(index);
    characterContainer.forEach((container) =>
      container.classList?.remove("active")
    );
    characterContainer[index].classList.add("active");
  });
};

// Search characters

const searchBtn = document.querySelector(".search-btn");
const searchError = document.querySelector(".sidebar-search--error");

searchBtn.addEventListener("click", () => {
  const inputfield = document.querySelector(".inputfield");
  const searchExpression = inputfield.value.toLowerCase().trim();
  console.log(searchExpression);

  for (const [index, char] of filteredChars.entries()) {
    if (char.name.toLowerCase().includes(searchExpression)) {
      showCharacter(index);
      inputfield.value = "";
      searchError.innerHTML = "";
      break;
    } else {
      searchError.innerHTML = "Character was not found!";
    }
  }
});

const showCharacter = (index) => {
  const sideBarImg = document.querySelector(".sidebar-img--container");
  const sideBarTitle = document.querySelector(".sidebar-title");
  const sideBarHouseImg = document.querySelector(".sidebar-house");
  const sideBarDescription = document.querySelector(".sidebar-description");

  if (filteredChars[index].picture) {
    sideBarImg.setAttribute("src", filteredChars[index].picture);
  } else {
    sideBarImg.setAttribute("src", "./assets/pictures/placeholder.png");
  }

  sideBarTitle.innerHTML = filteredChars[index].name;

  if (filteredChars[index].house) {
    sideBarHouseImg.setAttribute(
      "src",
      `./assets/houses/${filteredChars[index].house}.png`
    );
  } else if (filteredChars[index].organization) {
    sideBarHouseImg.setAttribute(
      "src",
      `./assets/houses/${filteredChars[index].organization}.png`
    );
  } else {
    sideBarHouseImg.setAttribute("src", "./assets/pictures/placeholder.png");
  }

  sideBarDescription.innerHTML = filteredChars[index].bio;
};
