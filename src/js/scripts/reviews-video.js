const videoBoxes = document.querySelectorAll('[data-element="review-video-container"]')
const countAllArray = document.querySelectorAll('[data-element="reviews__count-all"]')

for (let i = 0; i < videoBoxes.length; i++) {
    videoBoxInit(videoBoxes[i])
}

for (let i = 0; i < countAllArray.length; i++) {
    countAllArray[i].innerHTML = countAllArray.length
}

function videoBoxInit (videoBox) {
    const video = videoBox.getElementsByTagName('video')[0]
}
