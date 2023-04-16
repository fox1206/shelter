import petsJson from './pets.json' assert { type: 'json' };

/* пагинация */
const page = document.querySelector(".btn__page-curren");
const BTN_PAGE = document.querySelectorAll(".btn__page");
const arrayPets = [...petsJson, ...petsJson, ...petsJson, ...petsJson, ...petsJson, ...petsJson, ...petsJson];
// console.log(arrayPets);

let countCards = 8;
let pageNumber = 1;
let arrayPages = [];

if (window.innerWidth < 1250) countCards = 6;
if (window.innerWidth < 650) countCards = 3;
createPetsBox(countCards);

/* адаптив для отрисовки и получения числа карточек*/
function resizeWindow() {
  if(!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          if (window.innerWidth > 1280) countCards = 8;
          if (window.innerWidth < 1250) countCards = 6;
          if (window.innerWidth < 650) countCards = 3;
          if (window.innerWidth > 650 && pageNumber > arrayPages.length) pageNumber = arrayPages.length;
          if (window.innerWidth > 1280 && pageNumber > arrayPages.length) pageNumber = arrayPages.length;
          if (window.innerWidth <= 1250 && pageNumber < arrayPages.length) pageNumber = arrayPages.length;
          if (window.innerWidth < 650 && pageNumber < arrayPages.length) pageNumber = arrayPages.length;
      }, 100);
  }
}

/* cоздать бокс со всеми карточками питомцев */
function createPetsBox(countCards){
  const PETS_BOX = document.querySelector(".pets__box");
  arrayPages = [];

  for(let i = 0; i < 48; i += countCards){
    let arr = arrayPets.slice(i, i + countCards).sort(() => {
      Math.random() - 0.5;
    });
    // console.log(arr);

    arrayPages.push(arr);
    // console.log(arrayPages);
  }

  for(let i = 0; i < 48; i++){
    let cardItem = document.createElement("div");
    cardItem.className = "card__item";

    const cardContent = `<div class="card__picture">
                          <img src="${arrayPages[0][i].img}" alt="${arrayPages[0][i].name}"></img>
                        </div>
                        <div class="card__title">
                          <p>${arrayPages[0][i].name}</p>
                        </div>
                        <div class="card__btn">
                          <a class="btn" href="#">Learn more</a>
                        </div>`;
    cardItem.innerHTML = cardContent;
    PETS_BOX.prepend(cardItem);
  }
}

window.addEventListener('resize', resizeWindow, false);
let resizeTimeout;