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
      // 비동기 함수 호출하기 전 로딩 스피너 추가
      wrapper.innerHTML = `<div class="loader">Loading...</div>`;
      showJoinedChallenges();
    } else if (target.id == "content3") {
      joinedChallenges.innerHTML = "";
      pageJoined = 0;
      wrapper.innerHTML = `<div class="loader">Loading...</div>`;
      showCreatedChallenges();
    } else {
      // 프로필 칸으로 이동할 경우, 챌린지 정보들은 다 초기화
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
  const { condition, value } = processDates(
    challenge.startdate,
    challenge.enddate
  );
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
                        <section>
                          <p class="card-joinusers">${challenge.numJoined}명 참여</p>
                          <p class= "challenge-condition" id="color${value}">${condition}</p>
                        </section>
                      </div>
                    </article>
    `;
}
// 각 챌린지 참여가능 여부 표시를 위한 날짜 처리
function processDates(startdate, enddate) {
  const today = Date.now();

  //startdate 와 enddate의 형태를 Date 형식으로 변경
  const [startYear, startMonth, startDay] = startdate.split("-");
  startTime = new Date(
    Number(startYear),
    Number(startMonth - 1),
    Number(startDay)
  ).valueOf();

  const [endYear, endMonth, endDay] = enddate.split("-");
  endTime = new Date(
    Number(endYear),
    Number(endMonth) - 1,
    Number(endDay) + 1
  ).valueOf();

  // 조건에 따른 챌린지 상태 설정
  let condition = "";
  let value = 1;
  if (today < startTime) {
    condition = "모집중";
    value = 1;
  } else if (today > endTime) {
    condition = "종료";
    value = 3;
  } else {
    condition = "진행중";
    value = 2;
  }

  return { condition, value };
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
