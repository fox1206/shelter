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
function openCloseMenu() {
  burgerMenu.addEventListener('click', () => {
    console.log('open menu');
    menu.classList.toggle("open__menu");
    burgerMenu.classList.toggle("animation"); 
  });
}
openCloseMenu();