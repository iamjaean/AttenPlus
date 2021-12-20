//슬라이드
const slides = document.querySelector('.slider-list');
const slideImg = document.querySelectorAll('.slider-item')

const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

const slideWidth = 1056;

let curIndex = 0;
let slideCount = slideImg.length;

makeClone();
initSlide();
autoSlide();

function makeClone() {
    let cloneFirstSlide = slideImg[0].cloneNode(true);
    let cloneLastSlide = slides.lastElementChild.cloneNode(true);
    slides.append(cloneFirstSlide);
    slides.insertBefore(cloneLastSlide, slides.firstElementChild);
}

function initSlide() {
    slides.style.width = slideWidth * (slideCount + 2) + 'px';
    slides.style.left = -(slideWidth) + 'px';
}

function toNext() {
    if(curIndex <= slideCount - 1) {
        slides.style.left = -(curIndex + 2) * (slideWidth) + 'px';
        slides.style.transition = `${0.5}s ease-out`;
    }

    if(curIndex === slideCount - 1) {
        setTimeout(function() {
            slides.style.left = -(slideWidth) + 'px';
            slides.style.transition = `${0}s ease-out`;
        }, 500)
        curIndex = -1;
    }
    curIndex += 1;
}

function toPrev() {
    if(curIndex >= 0) {
        slides.style.left = - curIndex * slideWidth + 'px';
        slides.style.transition = `${0.5}s ease-out`;
    }
    if(curIndex === 0) {
        setTimeout(function() {
            slides.style.left = -slideCount * slideWidth + 'px';
            slides.style.transition = `${0}s ease-out`;
        }, 500)
        curIndex = slideCount;
    }
    curIndex -= 1;
}

function autoSlide() {
    setInterval(toNext, 3000);
    next.addEventListener('click', () => toNext())
    prev.addEventListener('click', () => toPrev())
}