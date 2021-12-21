function changeContent(id) {
  let btn = document.getElementById(id);
  if (btn.innerText == "취소" && id == "name") {
    goBackName(id);
    btn.innerText = "수정";
    return;
  } else if (btn.innerText == "취소" && id == "intro") {
    goBackIntro(id);
    btn.innerText = "수정";
    return;
  } else if (btn.innerText == "취소" && id == "password") {
    goBackPassword(id);
    btn.innerText = "수정";
    return;
  }
  btn.innerText = "취소";

  let content = document.getElementById(`${id}-content`);
  let userInput = document.createElement("form");
  userInput.setAttribute("id", `${id}-form`);
  userInput.action = `/user/${userShortId}`;
  userInput.method = "post";
  let val;
  if (id != "password") {
    val = content.innerText;
  }
  let contentParent = content.parentNode;
  contentParent.replaceChild(userInput, content);

  if (id == "intro") {
    let textInput = document.createElement("textarea");
    textInput.value = val;
    textInput.name = "intro";
    textInput.maxlength = "200";
    textInput.classList.add("textBox");
    userInput.action = `/user/${userShortId}/change-intro`;
    userInput.appendChild(textInput);
  } else if (id == "password") {
    userInput.action = `/user/${userShortId}/change-password`;
    setPasswordInput(userInput);
  } else if (id == "name") {
    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.maxlength = "10";
    textInput.value = val;
    textInput.name = "name";
    textInput.classList.add("inputBox");
    userInput.action = `/user/${userShortId}/change-name`;
    userInput.appendChild(textInput);
  }

  let submitInput = document.createElement("input");
  submitInput.type = "submit";
  submitInput.value = "수정";
  submitInput.classList.add("submitBox");
  userInput.appendChild(submitInput);
}

async function goBackName(id) {
  let comp = document.getElementById(id).parentNode.parentNode;
  let userInput = document.getElementById(`${id}-form`);
  let content = document.createElement("p");
  content.classList.add(`comp-content`);
  content.setAttribute("id", `${id}-content`);
  const response = await fetch(`/user/${userShortId}/userinfo`);
  const data = await response.json();
  content.innerText = data.name;
  comp.replaceChild(content, userInput);
}

async function goBackIntro(id) {
  let comp = document.getElementById(id).parentNode.parentNode;
  let userInput = document.getElementById(`${id}-form`);
  let content = document.createElement("p");
  content.classList.add(`comp-content`);
  content.setAttribute("id", `${id}-content`);
  const response = await fetch(`/user/${userShortId}/userinfo`);
  const data = await response.json();
  content.innerText = data.introduce;
  comp.replaceChild(content, userInput);
}

function goBackPassword(id) {
  let comp = document.getElementById(id).parentNode.parentNode;
  let userInput = document.getElementById(`${id}-form`);
  let content = document.createElement("p");
  content.classList.add(`comp-content`);
  content.setAttribute("id", `${id}-content`);
  comp.replaceChild(content, userInput);
}

function setPasswordInput(userInput) {
  let currentPasswordTitle = document.createElement("p");
  currentPasswordTitle.classList.add("comp-password");
  currentPasswordTitle.innerText = "현재 비밀번호";
  let newPasswordTitle = document.createElement("p");
  newPasswordTitle.classList.add("comp-password");
  newPasswordTitle.innerText = "변경할 비밀번호";

  let currentPassword = document.createElement("input");
  currentPassword.type = "password";
  currentPassword.name = "currentPassword";
  currentPassword.innerText = "현재 비밀번호";
  currentPassword.classList.add("inputBox");

  let newPassword = document.createElement("input");
  newPassword.type = "password";
  newPassword.name = "newPassword";
  newPassword.innerText = "변경할 비밀번호";
  newPassword.classList.add("inputBox");

  let confirmNewPassword = document.createElement("input");
  confirmNewPassword.type = "password";
  confirmNewPassword.name = "confirmNewPassword";
  confirmNewPassword.innerText = "변경할 비밀번호 확인";
  confirmNewPassword.classList.add("inputBox");

  userInput.appendChild(currentPasswordTitle);
  userInput.appendChild(currentPassword);
  userInput.appendChild(newPasswordTitle);
  userInput.appendChild(newPassword);
  userInput.appendChild(confirmNewPassword);
}
