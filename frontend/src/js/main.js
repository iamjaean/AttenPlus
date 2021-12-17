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



// main list

const newChallenges = document.querySelector('.new-challenges .container');
const allChallenges = document.querySelector('.all-challenges .container')

fetch('../../public/data/mockData.json')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        const challengeCount = data.length;
        
        for(let i = challengeCount - 1; i >= 0; i--) {
            if (i >= challengeCount - 8) {
                newChallenges.innerHTML += `
                    <div class="item-box">
                        <div class="img-wrapper">
                            <img src= ${data[i].imgUrl} alt="">
                        </div>
                        <div class="challenge-info">
                            <div class="detail-info">
                                <p class="challenge-category">${data[i].category}</p>
                                <p class="challenge-maker">${data[i].author}</p>
                            </div>
                            <h2 class="challenge-title">${data[i].title}</h2>
                        </div>
                    </div>
                `
            } else {
                allChallenges.innerHTML += `
                    <div class="item-box">
                        <div class="img-wrapper">
                            <img src= ${data[i].imgUrl} alt="">
                        </div>
                        <div class="challenge-info">
                            <div class="detail-info">
                                <p class="challenge-category">${data[i].category}</p>
                                <p class="challenge-maker">${data[i].author}</p>
                            </div>
                            <h2 class="challenge-title">${data[i].title}</h2>
                        </div>
                    </div>
                `
            }
        }
    });

// 무한 스크롤
