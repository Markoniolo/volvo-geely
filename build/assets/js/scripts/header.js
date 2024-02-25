"use strict";

var header = document.querySelector('[data-element="header"]');
var menuCloseBtn = document.querySelector('[data-element="mobile-menu-close"]');
var menuOpenBtn = document.querySelector('[data-element="mobile-menu-open"]');
var menu = document.querySelector('[data-element="mobile-menu"]');
var html = document.getElementsByTagName('html')[0];
if (header && menuCloseBtn && menuOpenBtn && menu) headerInit();
var currentScrollPosition;

function headerInit() {
  window.addEventListener('scroll', checkScroll);
  if (header.getBoundingClientRect().top + pageYOffset !== 16 && header.getBoundingClientRect().top + pageYOffset !== 20) checkScroll();
  menuCloseBtn.addEventListener('click', closeMenu);
  menuOpenBtn.addEventListener('click', openMenu);
}

function closeMenu() {
  html.classList.remove('html_no-scroll');
  menu.classList.remove('mobile-menu_active');
  window.scrollTo(0, currentScrollPosition);
}

function openMenu() {
  currentScrollPosition = pageYOffset;
  html.classList.add('html_no-scroll');
  menu.classList.add('mobile-menu_active');
}

function checkScroll() {
  var topPosition = header.getBoundingClientRect().top + pageYOffset;

  if (topPosition > 0) {
    header.classList.add('header_scroll');
  } else {
    header.classList.remove('header_scroll');
  }
}
//# sourceMappingURL=header.js.map
