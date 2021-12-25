// image가 아닌 유저 정보 변경에 대한 페이지 렌더. id값에 따라 이름, 소개, 비밀번호를 바꿀 수 있다.

function changeContent(id) {
  let btn = document.getElementById(id);

  // 만약 정보 수정을 하려다 취소를 한 경우에 따라, 각기 다른 함수를 이용해 페이지를 원래 모습으로 돌려 놓는 조건문
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

  // 수정시 정보를 받을 form의 기본 틀 생성
  let content = document.getElementById(`${id}-content`);
  let userInput = document.createElement("form");
  userInput.setAttribute("id", `${id}-form`);
  userInput.action = `/user/${userShortId}`;
  userInput.method = "post";
  let val;

  // 비밀번호가 아닌 경우, 원래 있던 기초값을 저장
  if (id != "password") {
    val = content.innerText;
  }

  // 수정을 위해 form 태그를 원래 정보를 보여주던 html과 교체
  let contentParent = content.parentNode;
  contentParent.replaceChild(userInput, content);

  if (id == "intro") {
    // 자기소개 입력칸 생성
    let textInput = document.createElement("textarea");
    textInput.value = val;
    textInput.name = "intro";
    textInput.maxLength = "200";
    textInput.placeholder = "자기소개를 입력해주세요.";
    textInput.classList.add("textBox");
    userInput.action = `/user/${userShortId}/change-intro`;
    userInput.appendChild(textInput);
  } else if (id == "password") {
    // 비밀번호 입력칸 생성은 뒤로 함수를 분리함
    userInput.action = `/user/${userShortId}/change-password`;
    setPasswordInput(userInput);
  } else if (id == "name") {
    // 이름 변경칸 생성
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

  // 공용으로 쓰이는 submit 버튼 생성
  let submitInput = document.createElement("input");
  submitInput.type = "submit";
  submitInput.value = "수정";
  submitInput.classList.add("submitBox");
  userInput.appendChild(submitInput);
}

// 프로필 이미지 변경 컴포넌트 렌더

function changeProfileImage(id) {
  // 위와 같이 수정하다 취소하는 경우의 대한 처리
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

  // image file 업로드 버튼과 파일 이름 표시칸 생성.
  let imgSelect = document.createElement("input");
  imgSelect.type = "file";
  imgSelect.name = "image";
  imgSelect.style.display = "none";

  let imgName = document.createElement("input");
  imgName.classList.add("inputBox2");
  imgName.placeholder = "파일 이름";
  userInput.appendChild(imgName);

  let imgLabel = document.createElement("label");
  imgLabel.innerText = "파일 업로드";
  imgLabel.appendChild(imgSelect);
  imgLabel.classList.add("submitBox");

  userInput.appendChild(imgLabel);

  // image가 업로드 되면 그 이름을 표시해 주는 함수
  imgSelect.addEventListener("change", (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    imgName.value = file.name;
  });

  let submitInput = document.createElement("input");
  submitInput.type = "submit";
  submitInput.value = "수정";
  submitInput.classList.add("submitBox");
  userInput.appendChild(submitInput);
}

// goBack--- : 변경하려다 취소버튼을 누를 시 페이지를 되돌리는 함수들.

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

// password 변경 컴포넌트들 렌더

function setPasswordInput(userInput) {
  // 현재 비밀번호, 변경할 비밀번호 제목 표시
  let currentPasswordTitle = document.createElement("label");
  currentPasswordTitle.classList.add("comp-password");
  currentPasswordTitle.innerText = "현재 비밀번호";
  let newPasswordTitle = document.createElement("label");
  newPasswordTitle.classList.add("comp-password");
  newPasswordTitle.innerText = "변경할 비밀번호";

  // 현재 비밀번호 입력칸
  let currentPassword = document.createElement("input");
  currentPassword.type = "password";
  currentPassword.name = "currentPassword";
  currentPassword.required = true;
  currentPassword.placeholder = "현재 비밀번호";
  currentPassword.classList.add("inputBox");

  // 새 비밀번호 입력칸
  let newPassword = document.createElement("input");
  newPassword.type = "password";
  newPassword.name = "newPassword";
  newPassword.required = true;
  newPassword.minLength = "6";
  newPassword.placeholder = "변경할 비밀번호";
  newPassword.classList.add("inputBox");

  // 새 비밀번호 확인 입력칸
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
