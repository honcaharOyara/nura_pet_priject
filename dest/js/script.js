// ================================ Slider ================================ //
const slideBoxes = document.querySelectorAll('.slider__box')
const sliderLine = document.querySelector('.slider__slides')
const btnPrev = document.querySelector('.slider__prev-btn')
const btnNext = document.querySelector('.slider__next-btn')

let count = 0,
    width

function init() {
    width = document.querySelector('.slider__wrap').offsetWidth
    sliderLine.style.width = width * slideBoxes.length + 'px'
    slideBoxes.forEach(item => {
        item.style.width = width + 'px'
        item.style.height = 'auto'
    })
}

window.addEventListener('resize', init)
init()

btnPrev.addEventListener('click', prevSlide)
btnNext.addEventListener('click', nextSlide)

function prevSlide() {
    count--
    if (count < 0) {
        count = slideBoxes.length - 1
    }
    rollSlide()
}

function nextSlide() {
    count++
    if (count >= slideBoxes.length) {
        count = 0
    }
    rollSlide()
}

function rollSlide() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px'
}

// ================================ Modal window ================================ //
const modalWindows = document.querySelectorAll('.modal-window__link')
const body = document.querySelector('.body')
const lockPadding = document.querySelector('.lock-padding')

let unlock = true

const timeout = 500

// Перевірка на наявність модальних вікон та отримання їх по усій сторінці сторінці, також вішаєм слухач події
// кліку на посилання, запускаюче модальне вікно.
if (modalWindows.length > 0) {
    for (let i = 0; i < modalWindows; i++) {
        const modalWindow = modalWindows[i]
        modalWindow.addEventListener("click", function (e) {
            const modalWindowName = modalWindow.getAttribute('href').replace('#','')
            const currentModalWindow = document.getElementById(modalWindowName)
            modalWindowOpen(currentModalWindow)
            e.preventDefault()
        })
    }
}

// Перевірка на наявність любого об'єкту у модальному вікні для закриття модального вікна
const closeModalWindowIcons = document.querySelectorAll('.close-modal-window')
if (closeModalWindowIcons.length > 0) {
    for (let i = 0; i < closeModalWindowIcons; i++) {
        const closeModalWindowIcon = closeModalWindowIcons[i]
        closeModalWindowIcon.addEventListener('click', function (e) {
            modalWindowClose(closeModalWindowIcon.closest('.modal-window'))
            e.preventDefault()
        })
    }
}

function modalWindowOpen(currentModalWindow) {
    if (currentModalWindow && unlock) {
        const modalWindowActive = document.querySelector('.modal-window.open')
        if (modalWindowActive) {
            modalWindowClose(modalWindowActive, false)
        } else {
            bodyLock()
        }
        currentModalWindow.classList.add('open')
        currentModalWindow.addEventListener('click', function (e) {
            if (!e.target.closest('.modal-window__content')) {
                modalWindowClose(e.target.closest('.modal-window'))
            }
        })
    }
}

function modalWindowClose(modalWindowActive, doUnlock = true) {
    if (unlock) {
        modalWindowActive.classList.remove('open')
        if (doUnlock) {
            bodyUnlock()
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.container').offsetWidth + 'px'

    if (lockPadding > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i]
            el.style.paddingRight = lockPaddingValue
        }
    }
    body.style.paddingRight = lockPaddingValue
    body.classList.add('lock')
    
    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i]
                el.style.paddingRight = '0px'
            }
        }
        body.style.paddingRight = '0px'
        body.classList.remove('.lock')
    },timeout)

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

// document.addEventListener('keydown', function (e) {
//     if(e.which === 27) {
//         const modalWindowActive = document.querySelector('.modal-window.open')
//         modalWindowClose(modalWindowActive)
//     }
// })

//Поліфіли для провірки та покращення підтримки браузерами деяких властивостей
// (function () {
//     if (!Element.prototype.closest) {
//         Element.prototype.closest = function (css) {
//             var node = this
//             while(node) {
//                 if (node.matches(css)) return node
//                 else node = node.parentElement
//             }
//             return null
//         }
//     }
// })()

// (function () {
//     if (!Element.prototype.matches) {
//         Element.prototype.matches = Element.prototype.matchesSelector ||
//             Element.prototype.webkitMatchesSelector||
//             Element.prototype.mozMatchesSelector ||
//             Element.prototype.msMatchesSelector
//     }
// })()