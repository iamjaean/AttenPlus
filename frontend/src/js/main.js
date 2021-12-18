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
fetch('../../public/data/mockData.json')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        let challengeCount = data.length;
        const newContainer = document.querySelector('.new-challenges .container');
        const allContainer = document.querySelector('.all-challenges .container');

        // 신규 챌린지 8개 
        for(let i = data.length - 1; i >= 0; i--) {
            if(i >= data.length - 8) {
                newContainer.innerHTML += innerTag(i)
                challengeCount -= 1;
            }
        }

        //신규 8개 제외한 모든 챌린지 불러오기
        loadImages()

        window.addEventListener('scroll', ()=> {
            if((window.scrollY + window.innerHeight >= document.documentElement.scrollHeight)){
                loadImages()
            }
        })

        function loadImages(numImages = 8) {
            let j = 1;
            while( j <= numImages) {
                if (challengeCount == 0) return;
                challengeCount -= 1;
                allContainer.innerHTML += innerTag(challengeCount);
                j++;
            }
        }

        //추가될 태그
        function innerTag(idx) {
            return (`
                    <div class="item-box">
                        <div class="img-wrapper">
                            <img src= ${data[idx].imgUrl} alt="">
                        </div>
                        <div class="challenge-info">
                            <div class="detail-info">
                                <p class="challenge-category">${data[idx].category}</p>
                                <p class="challenge-maker">${data[idx].author}</p>
                            </div>
                            <h2 class="challenge-title">${data[idx].title}</h2>
                        </div>
                    </div>
            `)
        }
    })