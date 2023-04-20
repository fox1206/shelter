const burgerMenu = document.querySelector(".burger__menu");
const menu = document.querySelector(".header__menu");
const menuList = document.querySelector(".menu__list");
const menuItem = document.querySelectorAll(".menu__item");
const shadow = document.querySelector(".shadow");
const body = document.querySelector("body");
const PRIMARY = "#F1CDB3";
const BLACK = "#000000";

/**
 * открыть / закрыть меню (плавное появление справа)
 */
function openCloseMenu(isOpen) {
  burgerMenu.addEventListener('click', () => {
    // console.log('open menu');
    menu.classList.toggle("open__menu");
    burgerMenu.classList.toggle("animation"); 
    isOpen();
  });
}

/**
 * Проверка на какой странице открыто меню и применение соответствующих стилей
 * фиксация иконки, затемнение и запрет на прокрутку основной страницы
 */
function isOpen(){
  let hrefPage = document.querySelectorAll('.menu__item a');

  if(menu.classList.contains("open__menu")){
    shadow.classList.add("shadowBody");
    body.classList.add("scrollMenu");

    // console.log(hrefPage[1].href);
    if(hrefPage[0].getAttribute("href") === "./../main/index.html"){
      document.querySelectorAll('.burger__menu span').forEach(el => el.style.backgroundColor=`${PRIMARY}`);
    }
  }
  else{
    shadow.classList.remove("shadowBody");
    body.classList.remove("scrollMenu");

    if(hrefPage[0].getAttribute("href") === "./../main/index.html"){
      document.querySelectorAll('.burger__menu span').forEach(el => el.style.backgroundColor=`${BLACK}`);
    }
  }
}

/**
 *  при нажатии на элемент списка сворачивается меню 
 *  и остается на месте бургер меню
 */
function clickElementCloseMenu(isOpen) {
  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      menu.classList.toggle("open__menu");
      burgerMenu.classList.toggle("animation");
      isOpen();
    });
  });
}

openCloseMenu(isOpen);
clickElementCloseMenu(isOpen);