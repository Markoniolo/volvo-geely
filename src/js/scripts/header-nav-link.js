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
