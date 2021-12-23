"use strict";

window.onload = function () {
  let inputName = document.getElementById("userName");
  let inputEmail = document.getElementById("userEmail");
  let inputPwd = document.getElementById("userPwd");
  let inputConfirm = document.getElementById("pwdConfirm");
  let subBtn = document.getElementsByClassName("login_submit_btn")[0];
  let form = document.getElementById("registerForm");

  inputName.addEventListener("input", checkUserName);
  inputEmail.addEventListener("input", checkUserEmail);
  inputPwd.addEventListener("input", checkUserPwd);
  inputConfirm.addEventListener("input", checkPwdConfirm);
  subBtn.addEventListener("click", checkAll);

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

  function checkAll(e) {
    e.preventDefault();
    if (
      document
        .getElementsByClassName("input_wrapper")[0]
        .classList.contains("isValid") ||
      !/^\S+@\S+\.\S+$/.test(inputEmail.value) ||
      !/^.{6,20}$/.test(inputPwd.value) ||
      inputPwd.value != inputConfirm.value
    ) {
      alert(`회원가입 양식을 정확히 작성해 주세요`);
      return;
    }

    form.submit();
  }
};
