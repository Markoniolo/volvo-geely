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
