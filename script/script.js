import petsJson from './pets.json' assert { type: 'json' };
import helpIcons from './iconsData.json' assert { type: 'json' };
// console.log(petsJson[0].name);

// slider
const cardsWrapper = document.querySelector(".cards__wrapper");
const BTN = document.querySelectorAll(".ribbon");
const SECTION_ACTIVE = document.querySelector(".cards__active");
const SECTION_LEFT = document.querySelector(".cards__left");
const SECTION_RIGHT = document.querySelector(".cards__right");

let countCards = 3;

/* функция перемешивания */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* функция внутренней структуры карточки */
function createCard(path, name) {
  const cardItem = `<div class="card__picture">
          <img src="${path}" alt=${name}></img>
        </div>
        <div class="card__title">
          <p>${name}</p>
        </div>
        <div class="card__btn">
          <a class="btn">Learn more</a>
        </div>`;
  
  const card = document.createElement("div");
  card.classList.add("card__item");
  card.innerHTML = cardItem;
  return card;      
}

/* функция заполнения блока с карточками данными из файла */
function getcards(){
  let pets = [];
  const activePets = document.querySelectorAll('.cards__active > card__item');
  const currentNamePets = [];

  activePets.forEach((item) => {
    currentNamePets.push(item.children[1].textContent);
  });

  let j = 0;

  for(let i = 0; i < countCards; i++){
    const {img, name} = petsJson[j];
    if(currentNamePets.includes(name)){
      j += 1;
      i -= 1;
      continue;
    }
    pets.push({img: img, name: name});
    j++;
  }
  return pets;
}

/* Рендеринг карточек */
function renderCards (parent, pets = []){
  const arrayPets = pets.length != 0 ? pets : getcards();

  arrayPets.forEach(item => {
    const card = createCard(item.img, item.name);
    parent.append(card);
  });
  return arrayPets;
}

/* Адаптив блока с карточками */
function resizeWindow() {
  if(!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          if (window.innerWidth < 1100) numberOfCards = 2;
          if (window.innerWidth < 767) numberOfCards = 1;
      }, 100);
  }
}

/* обработка кликов */
function changeBTN(event){
  if(event.target.classList.contains("ribbon-right")){
    // console.log("left btn");
    SECTION_LEFT.innerHTML = '';
    const newArray = renderCards(SECTION_LEFT);
    cardsWrapper.classList.add("move-right");
   
    cardsWrapper.addEventListener("animationend", () => {
      cardsWrapper.classList.remove("move-right");
      SECTION_ACTIVE.innerHTML = '';
      renderCards(SECTION_ACTIVE, newArray);
    });
  } else {
    // console.log("right btn");
    SECTION_RIGHT.innerHTML = '';
    const newArray = renderCards(SECTION_RIGHT);
    // console.log(newArray);
    cardsWrapper.classList.add("move-left");

    cardsWrapper.addEventListener("animationend", () => {
      cardsWrapper.classList.remove("move-left");
      SECTION_ACTIVE.innerHTML = '';
      renderCards(SECTION_ACTIVE, newArray);  
    });
  }
  shuffle(petsJson);
}



/* event */
BTN.forEach((btn) => btn.addEventListener("click", changeBTN));

/* вызов функций slider*/
shuffle(petsJson);
renderCards(document.querySelector(".cards__left"));
renderCards(document.querySelector(".cards__active"));
renderCards(document.querySelector(".cards__right"));
window.addEventListener('resize', () => resizeWindow, false);
let resizeTimeout;

/* формирование блока поддердка (иконки) */
function createSupportItem(){
  helpIcons.forEach((el) => {
    const li = document.createElement('li');
    li.className = 'item';
    const liContent = `<div class="icon">
                          <img src=${el.path} alt=${el.title}/>
                      </div>
                      <h4 class="icon-name">${el.title}</h4>`;
  
    li.innerHTML = liContent;
    document.querySelector('.support__box').appendChild(li);
  });
}
createSupportItem();

// попап
const MODAL_WRAPPER = document.querySelector(".modal__wrapper");
const MODAL_CONTENT = document.querySelector(".modal__content");
const MODAL_CLOSE = document.querySelector(".modal__close");
const MORE_BTN = document.querySelectorAll('.cards__active .card__btn a');

MODAL_CONTENT.addEventListener('click', (event) => event.stopPropagation());

/* функция открытия модального окна при клике на кнопку в карточке */
function createModalWin(){

  let divPicture = document.createElement("div");
  let divInfo = document.createElement("div");
    
  divPicture.className = "modal__picture";
  divInfo.className = "modal__info";

  MORE_BTN.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      let array = petsJson[i];

      divPicture.innerHTML = `<img src="${array.img}" alt="${array.name}" />`
      divInfo.innerHTML = `
                            <h3>${array.name}</h3>
                            <h4>${array.breed}</h4>
                            <p>${array.description}</p>
                            <ul>
                              <li><span>Age: </span>${array.age}</li>
                              <li><span>Inoculations: </span>${array.inoculations}</li>
                              <li><span>Diseases: </span>${array.diseases}</li>
                              <li><span>Parasites: </span>${array.parasites}</li>
                            </ul>
                          `;

      MODAL_CONTENT.append(divPicture);
      MODAL_CONTENT.append(divInfo);

      MODAL_WRAPPER.classList.add("show");
      document.body.classList.add('modal');
    });
  });

  MODAL_CLOSE.addEventListener("click", () => {
    MODAL_WRAPPER.classList.remove("show");
    document.body.classList.remove('modal');
  });
}
createModalWin();

