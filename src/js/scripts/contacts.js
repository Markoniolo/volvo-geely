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
