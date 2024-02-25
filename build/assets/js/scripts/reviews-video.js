"use strict";

var videoBoxes = document.querySelectorAll('[data-element="review-video-container"]');
var countAllArray = document.querySelectorAll('[data-element="reviews__count-all"]');

for (var i = 0; i < videoBoxes.length; i++) {
  videoBoxInit(videoBoxes[i]);
}

for (var _i = 0; _i < countAllArray.length; _i++) {
  countAllArray[_i].innerHTML = countAllArray.length;
}

function videoBoxInit(videoBox) {
  var video = videoBox.getElementsByTagName('video')[0];
}
//# sourceMappingURL=reviews-video.js.map
