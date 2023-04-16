import petsJson from './pets.json' assert { type: 'json' };

/* пагинация */
const page = document.querySelector(".btn__page-curren");
const BTN_PAGE = document.querySelectorAll(".btn__page");
const arrayPets = [...petsJson, ...petsJson, ...petsJson, ...petsJson, ...petsJson, ...petsJson, ...petsJson];
// console.log(arrayPets);

let countCardPage = 8;
let pageNumber = 1;
let arrayPages = [];

if(window.innerWidth < 1280) { countCardPage = 6; }
if(window.innerWidth < 767) { countCardPage = 3; }

createPetsBox();


/* cоздать бокс со всеми карточками питомцев */
function createPetsBox(){
  const PETS_BOX = document.querySelector(".pets__box");
  arrayPages = [];

  for(let i = 0; i < 48; i += countCardPage){
    let arr = arrayPets.slice(i, i + countCardPage).sort(() => {
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
                          <img src="${arrayPages[0][i].img}" alt=${arrayPages[0][i].name}></img>
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

