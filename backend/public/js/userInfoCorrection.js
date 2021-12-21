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
    textInput.maxLength = "200";
    textInput.placeholder = "자기소개를 입력해주세요.";
    textInput.classList.add("textBox");
    userInput.action = `/user/${userShortId}/change-intro`;
    userInput.appendChild(textInput);
  } else if (id == "password") {
    userInput.action = `/user/${userShortId}/change-password`;
    setPasswordInput(userInput);
  } else if (id == "name") {
    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.maxLength = "10";
    textInput.value = val;
    textInput.name = "name";
    textInput.placeholder = "이름";
    textInput.required = true;
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

function changeProfileImage(id) {
  let btn = document.getElementById(id);
  if (btn.innerText == "취소") {
    goBackImg(id);
    btn.innerText = "수정";
    return;
  }
  btn.innerText = "취소";

  let content = document.getElementById(`${id}-content`);
  let userInput = document.createElement("form");
  userInput.setAttribute("id", `${id}-form`);
  userInput.action = `/user/${userShortId}/upload`;
  userInput.enctype = "multipart/form-data";
  userInput.method = "post";

  let contentParent = content.parentNode;
  contentParent.replaceChild(userInput, content);

  let imgSelect = document.createElement("input");
  imgSelect.type = "file";
  imgSelect.name = "profile";
  imgSelect.classList.add("uploadBox");
  userInput.appendChild(imgSelect);

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

async function goBackImg(id) {
  let comp = document.getElementById(id).parentNode.parentNode;
  let userInput = document.getElementById(`${id}-form`);
  let content = document.createElement("p");
  content.classList.add(`comp-content`);
  content.setAttribute("id", `${id}-content`);
  comp.replaceChild(content, userInput);
}

function goBackPassword(id) {
  let comp = document.getElementById(id).parentNode.parentNode;
  let userInput = document.getElementById(`${id}-form`);
  let content = document.createElement("img");
  content.classList.add(`comp-content`);
  content.setAttribute("id", `${id}-content`);
  comp.replaceChild(content, userInput);
}

function setPasswordInput(userInput) {
  let currentPasswordTitle = document.createElement("label");
  currentPasswordTitle.classList.add("comp-password");
  currentPasswordTitle.innerText = "현재 비밀번호";
  let newPasswordTitle = document.createElement("label");
  newPasswordTitle.classList.add("comp-password");
  newPasswordTitle.innerText = "변경할 비밀번호";

  let currentPassword = document.createElement("input");
  currentPassword.type = "password";
  currentPassword.name = "currentPassword";
  currentPassword.required = true;
  currentPassword.placeholder = "현재 비밀번호";
  currentPassword.classList.add("inputBox");

  let newPassword = document.createElement("input");
  newPassword.type = "password";
  newPassword.name = "newPassword";
  newPassword.required = true;
  newPassword.minLength = "6";
  newPassword.placeholder = "변경할 비밀번호";
  newPassword.classList.add("inputBox");

  let confirmNewPassword = document.createElement("input");
  confirmNewPassword.type = "password";
  confirmNewPassword.name = "confirmNewPassword";
  confirmNewPassword.required = true;
  confirmNewPassword.minLength = "6";
  confirmNewPassword.placeholder = "변경할 비밀번호 확인";
  confirmNewPassword.classList.add("inputBox");

  userInput.appendChild(currentPasswordTitle);
  userInput.appendChild(currentPassword);
  userInput.appendChild(newPasswordTitle);
  userInput.appendChild(newPassword);
  userInput.appendChild(confirmNewPassword);
}
