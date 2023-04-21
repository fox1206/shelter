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
 
  // console.log(card.children[1].textContent);        
}

/* получить данные */
function getCard(){
  let pets = random();

  const MODAL_WRAPPER = document.querySelector(".modal__wrapper");
  const MODAL_CONTENT = document.querySelector(".modal__content");
  const MODAL_CLOSE = document.querySelector(".modal__close");

  let j = 0;

  for(let i = 0; i < countCards; i++){
    j++;
    createCards(pets[0][i].name, pets[0][i].img);
  }

  document.querySelectorAll("body .card__item a").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      
      MODAL_CONTENT.innerHTML = createModalPets(pets[0][i].img, pets[0][i].name, pets[0][i].breed, pets[0][i].description, pets[0][i].age, pets[0][i].inoculations, pets[0][i].diseases, pets[0][i].parasites);
      MODAL_WRAPPER.classList.add("show");
      document.body.classList.add('modal');
    });
  });

  MODAL_WRAPPER.classList.remove("show");
  document.body.classList.remove('modal');

  

  MODAL_CLOSE.addEventListener("click", () => {
    MODAL_WRAPPER.classList.remove("show");
    document.body.classList.remove('modal');
  });
 
  // console.log(pets[0]);  
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

// попап
function createModalPets(img, name, breed, description, age, inoculations, diseases, parasites){
  return `
            <div class="modal__picture">
              <img src="${img}" alt="${name}"/>
            </div>

            <div class="modal__info">
              <h3>${name}</h3>
              <h4>${breed}</h4>
              <p>${description}</p>
                <ul>
                  <li><span>Age: </span>${age}</li>
                  <li><span>Inoculations: </span>${inoculations}</li>
                  <li><span>Diseases: </span>${diseases}</li>
                  <li><span>Parasites: </span>${parasites}</li>
                </ul>
            </div> 
         `;
}
  










/* 

function createModalPets(){
const MODAL_WRAPPER = document.querySelector(".modal__wrapper");
const MODAL_CONTENT = document.querySelector(".modal__content");
const MODAL_CLOSE = document.querySelector(".modal__close");
const MORE_BTN = document.querySelectorAll('.card__item .card__btn a');

//  console.log("card pets");
let divPicture = document.createElement("div");
let divInfo = document.createElement("div");
  
divPicture.className = "modal__picture";
divInfo.className = "modal__info";

divPicture.innerHTML = `<img src="" alt="1212" />`
    divInfo.innerHTML = `
                          <h3>1212</h3>
                          <h4>122</h4>
                          <p>1221</p>
                          <ul>
                            <li><span>Age: </span>121211</li>
                            <li><span>Inoculations: </span>12</li>
                            <li><span>Diseases: </span>1212</li>
                            <li><span>Parasites: </span>12</li>
                          </ul>
                        `;

    MODAL_CONTENT.append(divPicture);
    MODAL_CONTENT.append(divInfo);

    MODAL_WRAPPER.classList.add("show");
    document.body.classList.add('modal');

// MORE_BTN.forEach((btn, i) => {
//   btn.addEventListener("click", () => {
    

//     divPicture.innerHTML = `<img src="" alt="1212" />`
//     divInfo.innerHTML = `
//                           <h3>1212</h3>
//                           <h4>122</h4>
//                           <p>1221</p>
//                           <ul>
//                             <li><span>Age: </span>121211</li>
//                             <li><span>Inoculations: </span>12</li>
//                             <li><span>Diseases: </span>1212</li>
//                             <li><span>Parasites: </span>12</li>
//                           </ul>
//                         `;

//     MODAL_CONTENT.append(divPicture);
//     MODAL_CONTENT.append(divInfo);

//     MODAL_WRAPPER.classList.add("show");
//     document.body.classList.add('modal');
//   });
// });

  // MODAL_CLOSE.addEventListener("click", () => {
  //   MODAL_WRAPPER.classList.remove("show");
  //   document.body.classList.remove('modal');
  // });
} */

/* событие по изменению окна браузера */
window.addEventListener("resize", resizeWin, false);
let resizeTimeout;