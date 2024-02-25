//=require scripts/helpers.js
const APP = {
	name: 'iBrush HTML Starter'
};

$(() => {
    svg4everybody()

    $('.about__slider').slick({
        infinite: false,
        variableWidth: true,
        slidesToShow: 2,
        prevArrow: $('.about__nav-btn_left'),
        nextArrow: $('.about__nav-btn_right'),
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                },
            },
        ]
    })

    $('.reviews__slider').slick({
        infinite: false,
        variableWidth: true,
        prevArrow: $('.reviews__nav-btn_left'),
        nextArrow: $('.reviews__nav-btn_right'),
    })

    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
})

const contacts = document.querySelector('[data-element="contacts"]')
const contactsBoxes = document.querySelectorAll('[data-element="contacts__box"]')
let mapItemArray

if (contacts) contactsMapInit()

function contactsMapInit() {
    mapItemArray = contacts.querySelectorAll('[data-element="contacts__item"]')
    for (let i = 0; i < mapItemArray.length; i++) {
        mapItemArray[i].addEventListener('click', toggleMap)
    }
    loadMap()
}

function loadMap() {
    const mapScript = document.createElement('script')

    mapScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
    document.body.appendChild(mapScript)

    mapScript.addEventListener('load', function () {
        ymaps.ready(initAllMaps)
    })
}

function initAllMaps () {
    const maps = contacts.querySelectorAll('.contacts__map')
    for (let i = 0; i < maps.length; i++) {
        initMap(maps[i], i)
    }
}

function toggleMap () {
    if (this.classList.contains('contacts__item_active')) return
    const oldActive = contacts.querySelector('.contacts__item_active')
    if (oldActive) oldActive.classList.remove('contacts__item_active')
    this.classList.add('contacts__item_active')
    const oldActiveBox = contacts.querySelector('.contacts__box_active')
    if (oldActiveBox) oldActiveBox.classList.remove('contacts__box_active')
    const index = this.getAttribute('data-index')
    contactsBoxes[index].classList.add('contacts__box_active')
}

function initMap(map, index) {
    const centerMap = map.getAttribute('data-coords-center')
    contactMapInit()

    function contactMapInit() {
        let myMap
        const zoom = 13
        myMap = new ymaps.Map(`contacts__map-${index+1}`, {
            center: JSON.parse(centerMap),
            zoom: zoom
        })

        const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="placemark-caption">$[properties.iconContent]</div>'
        )

        createPlacemark(mapItemArray[index])
        mapItemArray[index].addEventListener("click", setMapCenter)

        function createPlacemark(item) {
            const coords = JSON.parse(item.getAttribute('data-coords'))
            const caption = item.getAttribute('data-map-caption')
            const placemark = new ymaps.Placemark(coords, {
                iconCaption: caption,
                iconContent: caption
            }, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: 'assets/img/placemark.svg',
                iconImageSize: window.innerWidth > 1280 ? [34, 46] : [27, 37],
                iconImageOffset: window.innerWidth > 1280 ? [-17, -23] : [-23, -18],
                iconContentLayout: MyIconContentLayout
            })
            myMap.geoObjects.add(placemark)
        }

        function setMapCenter() {
            const centerCoords = JSON.parse(this.getAttribute("data-coords"))
            myMap.setCenter(centerCoords)
        }
    }
}

let indent = 80

if (document.querySelector('[data-role="scroll-to-anchor"]')) initScrollToAnchor()

function initScrollToAnchor() {
    const anchorElements = document.querySelectorAll('[data-role="scroll-to-anchor"]')

    for (let i = 0, len = anchorElements.length; i < len; i++) _loopAddEventScrollToAnchor(anchorElements[i])

    function _loopAddEventScrollToAnchor(node) {
        node.addEventListener('click', clickOnTheScrollElement)
    }

    window.addEventListener('resize', checkIndent)
    checkIndent()
}

function checkIndent() {
    indent = window.innerWidth < 1280 ? 60 : 80
}

function clickOnTheScrollElement(event) {
    event.preventDefault()
    if (this.classList.contains('mobile-menu__link')) closeMenu()
    let elementId
    if (this.dataset.link) elementId = this.dataset.link.substr(1)
    else elementId = this.hash.substr(1)
    const element = document.getElementById(elementId)
    if (element) animateScrollToAnchor(element)
}

function animateScrollToAnchor(theElement) {
    const positionNow = window.pageYOffset
    const positionElement = theElement.getBoundingClientRect().top + pageYOffset - indent
    const duration = 300
    const step = positionElement - positionNow
    const start = performance.now()

    requestAnimationFrame(function animate(time) {
        const timePassed = time - start

        if (timePassed > duration) {
            window.scrollTo(0, positionElement)
        } else {
            window.scrollTo(0, positionNow + step * (timePassed / duration))
            requestAnimationFrame(animate)
        }
    })
}

const header = document.querySelector('[data-element="header"]')
const menuCloseBtn = document.querySelector('[data-element="mobile-menu-close"]')
const menuOpenBtn = document.querySelector('[data-element="mobile-menu-open"]')
const menu = document.querySelector('[data-element="mobile-menu"]')
const html = document.getElementsByTagName('html')[0]

if (header && menuCloseBtn && menuOpenBtn && menu) headerInit()

let currentScrollPosition

function headerInit () {
    window.addEventListener('scroll', checkScroll)
    if (header.getBoundingClientRect().top + pageYOffset !== 16 && header.getBoundingClientRect().top + pageYOffset !== 20) checkScroll()
    menuCloseBtn.addEventListener('click', closeMenu)
    menuOpenBtn.addEventListener('click', openMenu)
}

function closeMenu () {
    html.classList.remove('html_no-scroll')
    menu.classList.remove('mobile-menu_active')
    window.scrollTo(0, currentScrollPosition)
}

function openMenu () {
    currentScrollPosition = pageYOffset
    html.classList.add('html_no-scroll')
    menu.classList.add('mobile-menu_active')
}

function checkScroll () {
    const topPosition = header.getBoundingClientRect().top + pageYOffset
    if (topPosition > 0) {
        header.classList.add('header_scroll')
    } else {
        header.classList.remove('header_scroll')
    }
}

const forms = document.querySelectorAll('[data-role="form-validate"]')

for (let i = 0; i < forms.length; i++) {
    formInit(forms[i])
}

function formInit (form) {
    const phone = form.querySelector('[data-role="form-input-phone"]')
    const name = form.querySelector('[data-role="form-input-name"]')

    phone.addEventListener('input', removeError)
    form.addEventListener('submit', validate)

    const maskPhone = new IMask(phone, { mask: '+{7} (000) 000-00-00' });
    const maskName = new IMask(name, { mask: /^[А-ЯЁa-zA-Z\s]+$/i });

    function removeError () {
        this.classList.remove('input-error')
    }

    function validate (e) {
        e.preventDefault()
        if (maskPhone.unmaskedValue.length < 11) {
            phone.classList.add('input-error')
        } else {
            fetchForm()
        }
    }

    async function fetchForm () {
        const url = form.getAttribute('action')
        fetch(url, {
            method: 'post',
            body: new FormData(form),
        })
            .then(res => { return res.json() })
            .then(data => { success() })
            .catch(() => {
                console.log('error')
            })

        success()

        function success () {
            console.log('success')
            closeModalForm(form)
            openThanks()
            phone.value = ''
            name.value = ''
        }
    }
}

function closeModalForm (node) {
    const fancyboxContent = node.closest('.fancybox__content')
    if (fancyboxContent) {
        const closeBtn = fancyboxContent.querySelector('.is-close-btn')
        closeBtn.click()
    }
}

function openThanks () {
    const thanksOpen = document.querySelector('[data-element="modal-thanks-open"]')
    thanksOpen.click()
}

const modalThanksButton = document.querySelector('[data-element="modal-thanks-button"]')
modalThanksButton.addEventListener('click', () => closeModalForm(modalThanksButton))

const navLinks = document.querySelectorAll('[data-element="header-nav-link"]')
const anchorSections = document.querySelectorAll('[data-role="anchor-section"]')

if (anchorSections.length && navLinks.length) navLinksInit()

function navLinksInit () {
    window.addEventListener('scroll', checkNav)
    checkNav()
}

function checkNav () {
    let isActiveLinkExist = false
    for (let i = anchorSections.length - 1; i >= 0; i--) {
        const position = window.pageYOffset + anchorSections[i].getBoundingClientRect().top
        const currentScroll = window.pageYOffset
        if (position - 120 - currentScroll < 0) {
            removeOldActiveNavLink()
            navLinks[i].classList.add('header__nav-link_active')
            isActiveLinkExist = true
            return
        }
    }
    if (!isActiveLinkExist) {
        removeOldActiveNavLink()
    }
}

function removeOldActiveNavLink () {
    const oldActiveLink = document.querySelector('.header__nav-link_active')
    if (oldActiveLink) oldActiveLink.classList.remove('header__nav-link_active')
}

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

"use strict";
//# sourceMappingURL=main.js.map
