import petsJson from './pets.json' assert { type: 'json' };
// console.log(petsJson[0].name);

// slider
let countCards = 3;

/* функция внутренней структуры карточки */
function createCard(path, name) {
  const cardItem = `<div class="card__picture">
          <img src="${path}" alt=${name}></img>
        </div>
        <div class="card__title">
          <p>${name}</p>
        </div>
        <div class="card__btn">
          <a class="btn" href="#">Learn more</a>
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


/* вызов функций */
renderCards(document.querySelector(".cards__active"));