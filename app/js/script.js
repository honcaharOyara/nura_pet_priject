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
const body = document.querySelector('body')
const modalWindowLink = document.querySelector('.modal-window__link')
const modalWindowBg = document.querySelector('.modal-window')
const modalWindowWrap = document.querySelector('.modal-window__wrap')

const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px'

modalWindowLink.addEventListener('click', function (e) {
    modalWindowBg.classList.add('open')
    body.style.overflowY = 'hidden'
    // document.querySelector('section').style.paddingRight = lockPaddingValue // add padding right scrollbar size
    modalWindowWrap.addEventListener('click', (e) => e.stopPropagation())
    burgerMenu.classList.remove('open')
    burgerMenuBtnOpen.classList.remove('hide-burger-menu__btn')
    e.preventDefault()
})

modalWindowBg.addEventListener('click', function () {
    modalWindowBg.classList.remove('open')
    body.style.overflowY = 'initial'
    // document.querySelector('section').style.padding = '0' // remove padding right scrollbar size
})

// ================================ Burger menu ================================ //
const burgerMenuBtnOpen = document.querySelector('body .burger-menu__btn-open')
const burgerMenuBtnClose = document.querySelector('body .burger-menu .burger-menu__wrap .burger-menu__btn-close')
const burgerMenu = document.querySelector('.burger-menu')

burgerMenuBtnOpen.addEventListener('click', function (e) {
    burgerMenu.classList.add('open')
    burgerMenuBtnOpen.classList.add('hide-burger-menu__btn')
    body.style.overflowY = 'hidden'
})

burgerMenuBtnClose.addEventListener('click', function (e) {
    burgerMenu.classList.remove('open')
    burgerMenuBtnOpen.classList.remove('hide-burger-menu__btn')
    body.style.overflowY = 'initial'
})