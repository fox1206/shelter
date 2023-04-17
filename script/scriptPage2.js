import petsJson from './pets.json' assert { type: 'json' };

/* пагинация */
const petBox = document.querySelector(".pets__box");
const current = document.querySelector(".btn__page-current");
const BTN_PAGE = document.querySelectorAll('.btn__page');

BTN_PAGE.forEach((btn) => btn.addEventListener("click", clickBtn));

let arrayPages = []; //для хранения карточек на страницах (6 страниц)
let countCards = 8;
let page = 1;

/* перемешивание карточек в массиве */
function shuffle(arr) {
  return arr.sort(() => Math.round(Math.random() * 100) - 50);
}

/* рандомное заполнение массива данных */
function random(){
  arrayPages = [];
  
  for(let i = 0; i < 48; i += countCards){
    let array = shuffle([...petsJson]);
    // console.log(array);
    arrayPages.push(array);
  }
  // console.log(arrayPages);
  // console.log(arrayPages[0]);

  return arrayPages;
}

/* создание карточки */
function createCards(name, img){
  const card = document.createElement("div");
  card.classList.add("card__item");

  card.innerHTML = `<div class="card__picture">
                      <img src="${img}" alt="${name}"/>
                   </div>
                   <div class="card__title">
                      <p>${name}</p>
                   </div>
                   <div class="card__btn">
                    <a class="btn" href="#">Learn more</a>
                   </div>`;

  petBox.appendChild(card);
  return card;                   
}

/* получить данные */
function getCard(){
  let pets = random();

  let j = 0;

  for(let i = 0; i < countCards; i++){
    j++;
    createCards(pets[0][i].name, pets[0][i].img);
  }
  console.log(pets);
}
getCard();

/* адаптив */
function resizeWin(){
  if(!resizeTimeout){
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      countCardsShow();
    }, 100);
  }
}

/* определение значние переменной */
function countCardsShow(){
  if(window.innerWidth >= 1250){
    countCards = 8;
  }
  if(window.innerWidth < 1250){
    countCards = 6;
  }
  if(window.innerWidth < 650){
    countCards = 3;
  }
}

/* функция перелистывания на следующую страницу и снятие disabled*/
function changePets(){
  document.querySelectorAll(".card__item").forEach((e) => e.remove());
  getCard();
  current.innerHTML = page;
  BTN_PAGE.forEach((el) => el.disabled = false);

  if(page === 1){
    BTN_PAGE[0].disabled = true;
    BTN_PAGE[1].disabled = true;
  }
  if(page === arrayPages.length){
    BTN_PAGE[2].disabled = true;
    BTN_PAGE[3].disabled = true;
  }
}

/* переключение */
function clickBtn(event){
  let btn = event.target.dataset.p;
  // changePets();
  switch(btn){
    case "first":
      page = 1;
      changePets();
    break;
    case "last":
      page = arrayPages.length;
      changePets();
    break;
    case "next":
      page++;
      changePets();
    break;
    case 'prew':
      page--;
      changePets();
    break;
  }
}


/* событие по изменению окна браузера */
window.addEventListener("resize", resizeWin, false);
let resizeTimeout;