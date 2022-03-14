const slideBoxes = document.querySelectorAll('.slider__box')
const sliderLine = document.querySelector('.slider__slides')
const btnPrev = document.querySelector('.slider__prev-btn')
const btnNext = document.querySelector('.slider__next-btn')

let count = 0,
    width

function init() {
        width = document.querySelector('.slider__wrap').offsetWidth
        sliderLine.style.width = width * slideBoxes.length +'px'
        slideBoxes.forEach( item => {
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