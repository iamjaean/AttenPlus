const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    tab.classList.add("active");
    target.classList.add("active");
  });
});

const joinedChallenges = document.querySelector('.joinedChallenge');
const createdChallenges = document.querySelector('.createdChallenge');

fetch('../../public/data/mockData2.json')
    .then((response) => response.json())
    .then((data)=> {
      const joinedChal= data.filter(datum => datum.joined.includes("유저3"))
      const createdChal = data.filter(datum=> datum.author == "유저3")
      return {joinedChal, createdChal}
    })
    .then(({joinedChal, createdChal}) => {
        const joinedChallengeCount = joinedChal.length;
        const createdChallengeCount = createdChal.length
        
        for(let i = joinedChallengeCount - 1; i >= 0; i--) {
                joinedChallenges.innerHTML += `
                    <article class="card">
                      <div class="img-wrapper">
                            <img src= ${joinedChal[i].imgUrl} alt="">
                      </div>
                      <div>
                        <div class="detail-info">
                                <p class="challenge-category">${joinedChal[i].category}</p>
                                <p class="challenge-maker">${joinedChal[i].author}</p>
                        </div>
                        <h2 class="challenge-title">${joinedChal[i].title}</h2>
                      </div>
                    </article>
                `
        }

        for(let i = createdChallengeCount - 1; i >= 0; i--) {
                createdChallenges.innerHTML += `
                    <article class="card">
                      <div class="img-wrapper">
                            <img src= ${createdChal[i].imgUrl} alt="">
                      </div>
                      <div>
                        <div class="detail-info">
                                <p class="challenge-category">${createdChal[i].category}</p>
                                <p class="challenge-maker">${createdChal[i].author}</p>
                        </div>
                        <h2 class="challenge-title">${createdChal[i].title}</h2>
                      </div>
                    </article>
                `
        }
    });