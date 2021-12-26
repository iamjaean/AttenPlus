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
const detailPageModal = document.querySelector(".detailPageModal");
// "November 12, 2021", "December 13, 2021", "December 15, 2021" 이러한 형식으로.
const changeReviewText = document.querySelector(".changeReviewText");
const attendDay = [];
const absentDay = [];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const allPlanDay = findAllDates(thisStartDate, thisEndDate);

function findAllDates(startDate, lastDate) {
  var result = [];
  var nowDate = new Date(startDate);
  while (nowDate <= new Date(lastDate)) {
    let beforeConvertTime = nowDate.toISOString().split("T")[0];
    result.push(month[Number(beforeConvertTime.slice(5, 7)) - 1] + " " + String(Number(beforeConvertTime.slice(8))) + ", " + beforeConvertTime.slice(0, 4));
    if (thisAttendDate.split(",").includes(beforeConvertTime) && getTodayDate() >= beforeConvertTime) {
      attendDay.push(month[Number(beforeConvertTime.slice(5, 7)) - 1] + " " + String(Number(beforeConvertTime.slice(8))) + ", " + beforeConvertTime.slice(0, 4));
    } else if (!thisAttendDate.split(",").includes(beforeConvertTime) && getTodayDate() > beforeConvertTime) {
      absentDay.push(month[Number(beforeConvertTime.slice(5, 7)) - 1] + " " + String(Number(beforeConvertTime.slice(8))) + ", " + beforeConvertTime.slice(0, 4));
    }

    nowDate.setDate(nowDate.getDate() + 1);
  }
  return result;
}

detailCalendar &&
  detailCalendar.flatpickr({
    onDayCreate: (dObj, dStr, fp, dayElem) => {
      if (allPlanDay.includes(dayElem.ariaLabel)) {
        dayElem.style["font-weight"] = "800";
      }
      if (attendDay.includes(dayElem.ariaLabel)) {
        dayElem.innerHTML += "<span class='attend'></span>";
      } else if (absentDay.includes(dayElem.ariaLabel)) {
        dayElem.innerHTML += "<span class='absent'></span>";
      }
    },
    inline: true,
  });
if (allPlanDay.length === attendDay.length) {
  document.querySelector(".registerForbiddenButton").innerHTML = "모든 챌린지를 완료했습니다";
}

if (thisEndDate <= getTodayDate() && attendDay != "" && allPlanDay.length !== attendDay.length && document.querySelector(".registerForbiddenButton")) {
  document.querySelector(".registerForbiddenButton").innerHTML = "챌린지를 모두 완료하지 못했습니다";
  document.querySelector(".registerForbiddenButton").style["font-size"] = "18px";
}

if (allPlanDay.length === attendDay.length) {
  detailPageModal.style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
}

detailPageModal.addEventListener("click", (event) => {
  if (event.target === detailPageModal) {
    detailPageModal.style.display = "none";
    if (detailPageModal.style.display !== "block") {
      document.querySelector("body").style.overflow = "auto";
    }
  }
});
function getTodayDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}
