const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

const joinedChallenges = document.querySelector('.joinedChallenge');
const createdChallenges = document.querySelector('.createdChallenge');

let limit = 8;
let pageJoined = 0;
let pageCreated = 0;

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

    if(target.id == "content2"){
        createdChallenges.innerHTML = '';
        pageCreated = 0;
        showLoadingJoined();
 
    }else if (target.id == "content3"){
        joinedChallenges.innerHTML = '';
        pageJoined = 0;

        showLoadingCreated();
    }

  });
});


async function getJoinedChallenges(){
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${pageJoined}`)
  
  const data = await response.json()
  return data.filter(datum => datum.albumId =="1")
}

async function showJoinedChallenges(){
  const challenges = await getJoinedChallenges();
  challenges.forEach(challenge=>{
    joinedChallenges.innerHTML += `
                    <article class="card">
                      <div class="img-wrapper">
                        <a href="">
                            <img loading ="lazy" src= ${challenge.url} alt="참여한 챌린지">
                        </a>
                      </div>
                      <div>
                        <div class="detail-info">
                                <p class="challenge-category">${challenge.albumId}</p>
                                <p class="challenge-maker">${challenge.id}</p>
                        </div>
                        <a href="" class="challenge-title">${challenge.title}</a>
                      </div>
                    </article>
                `
  })
}

async function getCreatedChallenges(){
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${pageCreated}`)
  
  const data = await response.json()
  return data.filter(datum => datum.albumId =="1")
}

async function showCreatedChallenges(){
  const challenges = await getCreatedChallenges();
  challenges.forEach(challenge=>{
    createdChallenges.innerHTML += `
                    <article class="card">
                      <div class="img-wrapper">
                        <a href="">
                            <img loading ="lazy" src= ${challenge.url} alt="참여한 챌린지">
                        </a>
                      </div>
                      <div>
                        <div class="detail-info">
                                <p class="challenge-category">${challenge.albumId}</p>
                                <p class="challenge-maker">${challenge.id}</p>
                        </div>
                        <a href="" class="challenge-title">${challenge.title}</a>
                      </div>
                    </article>
                `
  })
}

function showLoadingJoined(){
  setTimeout(()=>{
    pageJoined++;
    showJoinedChallenges()
  }, 300)
}

function showLoadingCreated(){
  setTimeout(()=>{
    pageCreated++;
    showCreatedChallenges()
  }, 0)
}

window.addEventListener('scroll', ()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight-5){
      let currentTab = document.getElementsByClassName("content active")[0]
      if(currentTab.id == "content2"){
        showLoadingJoined();
      }else if(currentTab.id == "content3"){
        showLoadingCreated();
      }
      
    }
})

