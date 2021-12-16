let content1 = document.getElementById("content1");
let content2 = document.getElementById("content2");
let content3 = document.getElementById("content3");

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");

function openProfile() {
  content1.style.transform = "translateX(0%)";
  content2.style.transform = "translateX(100%)";
  content3.style.transform = "translateX(100%)";
  btn1.style.borderBottom = "3px solid black";
  btn2.style.borderBottom = "transparent";
  btn3.style.borderBottom = "transparent";
}

function openJoinedChallenges() {
  content1.style.transform = "translateX(100%)";
  content2.style.transform = "translateX(0%)";
  content3.style.transform = "translateX(100%)";
  btn1.style.borderBottom = "transparent";
  btn2.style.borderBottom = "3px solid black";
  btn3.style.borderBottom = "transparent";
}
function openCreatedChallenges() {
  content1.style.transform = "translateX(100%)";
  content2.style.transform = "translateX(100%)";
  content3.style.transform = "translateX(0%)";
  btn1.style.borderBottom = "transparent";
  btn2.style.borderBottom = "transparent";
  btn3.style.borderBottom = "3px solid black";
}
