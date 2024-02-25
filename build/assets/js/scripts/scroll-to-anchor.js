"use strict";

var indent = 80;
if (document.querySelector('[data-role="scroll-to-anchor"]')) initScrollToAnchor();

function initScrollToAnchor() {
  var anchorElements = document.querySelectorAll('[data-role="scroll-to-anchor"]');

  for (var i = 0, len = anchorElements.length; i < len; i++) {
    _loopAddEventScrollToAnchor(anchorElements[i]);
  }

  function _loopAddEventScrollToAnchor(node) {
    node.addEventListener('click', clickOnTheScrollElement);
  }

  window.addEventListener('resize', checkIndent);
  checkIndent();
}

function checkIndent() {
  indent = window.innerWidth < 1280 ? 60 : 80;
}

function clickOnTheScrollElement(event) {
  event.preventDefault();
  if (this.classList.contains('mobile-menu__link')) closeMenu();
  var elementId;
  if (this.dataset.link) elementId = this.dataset.link.substr(1);else elementId = this.hash.substr(1);
  var element = document.getElementById(elementId);
  if (element) animateScrollToAnchor(element);
}

function animateScrollToAnchor(theElement) {
  var positionNow = window.pageYOffset;
  var positionElement = theElement.getBoundingClientRect().top + pageYOffset - indent;
  var duration = 300;
  var step = positionElement - positionNow;
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timePassed = time - start;

    if (timePassed > duration) {
      window.scrollTo(0, positionElement);
    } else {
      window.scrollTo(0, positionNow + step * (timePassed / duration));
      requestAnimationFrame(animate);
    }
  });
}
//# sourceMappingURL=scroll-to-anchor.js.map
