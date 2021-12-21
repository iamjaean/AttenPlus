"use strict";

window.onload = function () {
  let inputName = document.getElementById("userName");
  let inputEmail = document.getElementById("userEmail");
  let inputPwd = document.getElementById("userPwd");
  let inputConfirm = document.getElementById("pwdConfirm");

  inputName.addEventListener("input", checkUserName);
  inputEmail.addEventListener("input", checkUserEmail);
  inputPwd.addEventListener("input", checkUserPwd);
  inputConfirm.addEventListener("input", checkPwdConfirm);

  function checkUserName() {
    let spanTag = this.parentElement;
    if (inputName.value.length <= 0) {
      if (spanTag.classList.contains("isValid")) {
        spanTag.classList.remove("isValid");
        spanTag.nextElementSibling.remove();
      }
    } else if (
      (inputName.value.length <= 1 || 19 < inputName.value.length) &&
      !spanTag.classList.contains("isValid")
    ) {
      spanTag.classList.add("isValid");
      let warning = document.createElement("div");
      warning.classList.add("form_warning");
      let warningText = document.createTextNode(
        "이름은 2자 이상, 20자 이하로 입력하세요."
      );
      warning.appendChild(warningText);

      spanTag.parentElement.appendChild(warning);
    } else if (
      spanTag.classList.contains("isValid") &&
      1 < inputName.value.length &&
      inputName.value.length < 20
    ) {
      spanTag.classList.remove("isValid");
      spanTag.nextElementSibling.remove();
    }
  }

  function checkUserEmail() {
    let spanTag = this.parentElement;
    if (inputEmail.value.length <= 0) {
      if (spanTag.classList.contains("isValid")) {
        spanTag.classList.remove("isValid");
        spanTag.nextElementSibling.remove();
      }
    } else if (/^\S+@\S+\.\S+$/.test(inputEmail.value)) {
      if (spanTag.classList.contains("isValid")) {
        spanTag.classList.remove("isValid");
        spanTag.nextElementSibling.remove();
      }
    } else if (
      !/^\S+@\S+\.\S+$/.test(inputEmail.value) &&
      !spanTag.classList.contains("isValid")
    ) {
      spanTag.classList.add("isValid");
      let warning = document.createElement("div");
      warning.classList.add("form_warning");
      let warningText =
        document.createTextNode("유효하지 않은 이메일 형식입니다.");
      warning.appendChild(warningText);

      spanTag.parentElement.appendChild(warning);
    }
  }

  function checkUserPwd() {
    let spanTag = this.parentElement;

    if (inputPwd.value.length <= 0) {
      if (spanTag.classList.contains("isValid")) {
        spanTag.classList.remove("isValid");
        spanTag.nextElementSibling.remove();
      }
    } else if (
      /^.{6,20}$/.test(inputPwd.value) &&
      spanTag.classList.contains("isValid")
    ) {
      if (spanTag.classList.contains("isValid")) {
        spanTag.classList.remove("isValid");
        spanTag.nextElementSibling.remove();
      }
    } else if (
      !/^.{6,20}$/.test(inputPwd.value) &&
      !spanTag.classList.contains("isValid")
    ) {
      spanTag.classList.add("isValid");
      let warning = document.createElement("div");
      warning.classList.add("form_warning");
      let warningText = document.createTextNode(
        "비밀번호는 6자 이상, 20자 이하로 입력하세요."
      );
      warning.appendChild(warningText);

      spanTag.parentElement.insertBefore(warning, spanTag.nextElementSibling);
    }
  }

  function checkPwdConfirm() {
    let spanTag = this.parentElement;

    if (inputConfirm.value.length <= 0) {
      if (spanTag.classList.contains("isValid")) {
        spanTag.classList.remove("isValid");
        spanTag.nextElementSibling.remove();
      }
    } else if (
      inputPwd.value == inputConfirm.value &&
      spanTag.classList.contains("isValid")
    ) {
      if (spanTag.classList.contains("isValid")) {
        spanTag.classList.remove("isValid");
        spanTag.nextElementSibling.remove();
      }
    } else if (
      inputPwd.value != inputConfirm.value &&
      !spanTag.classList.contains("isValid")
    ) {
      spanTag.classList.add("isValid");
      let warning = document.createElement("div");
      warning.classList.add("form_warning");
      let warningText =
        document.createTextNode("비밀번호가 일치하지 않습니다.");
      warning.appendChild(warningText);

      spanTag.parentElement.appendChild(warning);
    }
  }
};
