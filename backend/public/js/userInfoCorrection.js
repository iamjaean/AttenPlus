function changeContent(id) {
  let btn = document.getElementById(id);

  if (btn.innerText == "취소") {
    goBackContent(id);
    btn.innerText = "수정";
    return;
  }
  btn.innerText = "취소";

  let content = document.getElementById(`${id}-content`);
  let val = content.innerText;
  let userInput = document.createElement("form");
  userInput.setAttribute("id", `${id}-form`);
  let contentParent = content.parentNode;
  contentParent.replaceChild(userInput, content);

  if (id == "introduce") {
    let textInput = document.createElement("textarea");
    textInput.value = val;
    textInput.classList.add("textBox");
    userInput.appendChild(textInput);
  } else if (id == "password") {
    setPasswordInput(userInput);
  } else {
    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = val;
    textInput.classList.add("inputBox");
    userInput.appendChild(textInput);
  }

  let submitInput = document.createElement("input");
  submitInput.type = "submit";
  submitInput.value = "수정";
  submitInput.classList.add("submitBox");
  userInput.appendChild(submitInput);
}

function goBackContent(id) {
  let comp = document.getElementById(id).parentNode.parentNode;
  let userInput = document.getElementById(`${id}-form`);
  let content = document.createElement("p");
  content.classList.add(`comp-content`);
  content.setAttribute("id", `${id}-content`);
  comp.replaceChild(content, userInput);
}

function setPasswordInput(userInput) {
  let currentPasswordTitle = document.createElement("p");
  currentPasswordTitle.innerText = "현재 비밀번호";
  let newPasswordTitle = document.createElement("p");
  newPasswordTitle.innerText = "변경할 비밀번호";

  let currentPassword = document.createElement("input");
  currentPassword.type = "text";
  currentPassword.classList.add("inputBox");

  let newPassword = document.createElement("input");
  newPassword.type = "text";
  newPassword.classList.add("inputBox");

  let confirmNewPassword = document.createElement("input");
  confirmNewPassword.type = "text";
  confirmNewPassword.classList.add("inputBox");

  userInput.appendChild(currentPasswordTitle);
  userInput.appendChild(currentPassword);
  userInput.appendChild(newPasswordTitle);
  userInput.appendChild(newPassword);
  userInput.appendChild(confirmNewPassword);
}
