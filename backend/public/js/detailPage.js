const detailPostCategory = document.querySelector(".postCategory");
const challengeTitle = document.querySelector(".challengeTitle");
const creatorIcon = document.querySelector(".creatorIcon");
//아이콘이 없는 경우 기본값으로 설정
const creatorName = document.querySelector(".creatorName");
const detailPostImg = document.querySelector(".detailPostImg");
const startDate = document.querySelector(".startDate");
const endDate = document.querySelector(".endDate");
const storyContent = document.querySelector(".storyContent");

const detailCalendar = document.querySelector(".calendar");
const registerButton = document.querySelector(".registerButton");
const attendButton = document.querySelector(".attendButton");
const reviewUser = document.querySelector(".reviewUser");
const reviewIcon = document.querySelector(".reviewIcon");
const createCardLink = document.querySelector(".createCardLink");
//서버에서 정보 받아와야함
const attendDay = ["December 12, 2021", "December 13, 2021", "December 15, 2021", "December 16, 2021"];
const absentDay = ["December 14, 2021", "December 17, 2021"];

//출석 달력 설정
//로그인된 유저가 해당 챌린지에 참여할 때만 함수를 실행
//이부분도 ejs로 수정할 것
detailCalendar &&
  detailCalendar.flatpickr({
    onDayCreate: (dObj, dStr, fp, dayElem) => {
      if (attendDay.includes(dayElem.ariaLabel)) {
        dayElem.innerHTML += "<span class='attend'></span>";
      } else if (absentDay.includes(dayElem.ariaLabel)) {
        dayElem.innerHTML += "<span class='absent'></span>";
      }
    },
    inline: true,
  });

// fetch("../../public/data/mockData.json")
//   .then((response) => response.json())
//   .then((data) => {
//     //filter로 찾아야함
//     detailPostCategory.innerHTML = `<div>${data[3].category}<div/>`;
//     detailPostImg.innerHTML = `<img src="${data[3].imgUrl}"/>`;
//     creatorName.innerHTML = `<span>${data[3].author}<span/>`;
//     challengeTitle.innerHTML = `<h1>${data[3].author}<h1/>`;
//     reviewIcon.innerHTML = `<img src="../../public/assets/img/img-user-default.png"/>`;
//     // 다른 항목들도 나중에 연결

//     console.log(data);
//   });
function getTodayDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}
function attendThisChallenge() {
  fetch(`/detail/${thisPageInfo}/comments`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: getTodayDate() }),
  }).then((res) => {
    if (res.ok) {
      window.alert("신청되었습니다");
      window.location.reload();
    } else {
      alert("오류가 발생했습니다.");
    }
  });
}

registerButton &&
  registerButton.addEventListener("click", () => {
    //요청을 보내 정상적으로 처리되었는지 확인되었을때 alert를 쓰기
    window.confirm("해당 챌린지에 참여하시겠습니까?") ? attendThisChallenge() : "";
  });
attendButton &&
  attendButton.addEventListener("click", () => {
    //요청을 보내 정상적으로 처리되었는지 확인되었을때 alert를 쓰기
    window.confirm("해당 챌린지에 출석하시겠습니까?") ? attendThisChallenge() : "";
  });
createCardLink.addEventListener("click", (e) => {
  e.preventDefault();
  //요청을 보내 정상적으로 처리되었는지 확인되었을때 alert를 쓰기
  document.querySelector(".createCard").innerHTML = ` <form class="reviewForm">
    <textarea cols="40" rows="4" style="resize: none; border: 0px;margin-top:-20px;border-radius: 10px;"></textarea>
  </form>
  <div class="addCardLink"><button type="button" onclick="location.href='/create'">후기 쓰기</button></div>`;
});
