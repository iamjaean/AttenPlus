//모든 챌린지 무한스크롤
fetch('../data/mockData.json') //테스트용 로컬 목데이터가져오기
    .then((response) => response.json())
    .then((data) => {
        let challengeCount = data.length - 8;
        const newContainer = document.querySelector('.new-challenges .container');
        const allContainer = document.querySelector('.all-challenges .container');

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
                allContainer.innerHTML += `
                    <div class="item-box">
                        <a href = "/detail">
                            <div class="img-wrapper">
                                <img src= ${data[challengeCount].imgUrl} alt="">
                            </div>
                            <div class="challenge-info">
                                <div class="detail-info">
                                    <p class="challenge-category">${data[challengeCount].category}</p>
                                    <p class="challenge-maker">${data[challengeCount].author}</p>
                                </div>
                                <h2 class="challenge-title">${data[challengeCount].title}</h2>
                            </div>
                        </a>
                    </div>
                `;
                j++;
            }
        }
    })