"use strict";

var navLinks = document.querySelectorAll('[data-element="header-nav-link"]');
var anchorSections = document.querySelectorAll('[data-role="anchor-section"]');
if (anchorSections.length && navLinks.length) navLinksInit();

function navLinksInit() {
  window.addEventListener('scroll', checkNav);
  checkNav();
}

function checkNav() {
  var isActiveLinkExist = false;

  for (var i = anchorSections.length - 1; i >= 0; i--) {
    var position = window.pageYOffset + anchorSections[i].getBoundingClientRect().top;
    var currentScroll = window.pageYOffset;

    if (position - 120 - currentScroll < 0) {
      removeOldActiveNavLink();
      navLinks[i].classList.add('header__nav-link_active');
      isActiveLinkExist = true;
      return;
    }
  }

  if (!isActiveLinkExist) {
    removeOldActiveNavLink();
  }
}

function removeOldActiveNavLink() {
  var oldActiveLink = document.querySelector('.header__nav-link_active');
  if (oldActiveLink) oldActiveLink.classList.remove('header__nav-link_active');
}
//# sourceMappingURL=header-nav-link.js.map
