const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

const joinedChallenges = document.querySelector(".joinedChallenge");
const createdChallenges = document.querySelector(".createdChallenge");

const wrapper = document.getElementById("loader-wrapper");

let limit = 16;
let pageJoined = 0;
let pageCreated = 0;

// tab 변경에 따른 페이지 변경 기능

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

    // tab이 변경되면 다른 탭에 있는 정보는 초기화
    if (target.id == "content2") {
      createdChallenges.innerHTML = "";
      pageCreated = 0;
      wrapper.innerHTML = `<div class="loader">Loading...</div>`;
      showJoinedChallenges();
    } else if (target.id == "content3") {
      joinedChallenges.innerHTML = "";
      pageJoined = 0;
      wrapper.innerHTML = `<div class="loader">Loading...</div>`;
      showCreatedChallenges();
    } else {
      createdChallenges.innerHTML = "";
      pageCreated = 0;
      joinedChallenges.innerHTML = "";
      pageJoined = 0;
    }
  });
});

// 참여한 챌린지들 데이터를 받음

async function getJoinedChallenges() {
  pageJoined++;
  const response = await fetch(
    `http://elice-kdt-sw-1st-vm04.koreacentral.cloudapp.azure.com/user/${authorShortId}/joined?_limit=${limit}&_page=${pageJoined}`
  );

  const data = await response.json();
  return data;
}

// 참여한 챌린지들을 페이지에 렌더

async function showJoinedChallenges() {
  const challenges = await getJoinedChallenges();
  challenges.forEach((challenge) => {
    joinedChallenges.innerHTML += challengeHTML(challenge);
  });
  wrapper.innerHTML = "";
}

// 생성한 챌린지들 데이터를 받음

async function getCreatedChallenges() {
  pageCreated++;
  const response = await fetch(
    `http://elice-kdt-sw-1st-vm04.koreacentral.cloudapp.azure.com/user/${authorShortId}/created?_limit=${limit}&_page=${pageCreated}`
  );
  const data = await response.json();
  return data;
}

// 생성한 챌린지들 데이터를 렌더

async function showCreatedChallenges() {
  const challenges = await getCreatedChallenges();
  challenges.forEach((challenge) => {
    createdChallenges.innerHTML += challengeHTML(challenge);
  });
  wrapper.innerHTML = "";
}

// challenge에 따른 HTML 반환

function challengeHTML(challenge) {
  return `
                    <article class="card">
                      <div class="user-img-wrapper">
                        <a href="${challenge.url}">
                            <img src="data:image/${challenge.img.contentType};base64,${challenge.img.data}" alt="생성된 챌린지"/>
                        </a>
                      </div>
                      <div>
                        <div class="detail-info">
                                <p class="challenge-category">${challenge.category}</p>
                                <p class="challenge-maker">${challenge.name}</p>     
                        </div>
                        <div class="card-title">
                                <a href="${challenge.url}" class="challenge-title">${challenge.title}</a>
                        </div>
                        <p class="card-joinusers">${challenge.numJoined}명 참여</p>
                      </div>
                    </article>
    `;
}

// infinite scroll 기능구현을 위한 eventlistener

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    let currentTab = document.getElementsByClassName("content active")[0];
    if (currentTab.id == "content2") {
      showJoinedChallenges();
    } else if (currentTab.id == "content3") {
      showCreatedChallenges();
    }
  }
});
