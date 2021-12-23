window.onload = function () {
  let inputEmail = document.getElementById("email");
  let inputPwd = document.getElementById("password");
  let subBtn = document.getElementsByClassName("login_submit_btn")[0];
  let form = document.getElementById("loginForm");

  inputEmail.addEventListener("input", checkUserEmail);
  inputPwd.addEventListener("input", checkUserPwd);
  subBtn.addEventListener("click", checkAll);

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

  function checkAll(e) {
    e.preventDefault();
    if (
      !/^\S+@\S+\.\S+$/.test(inputEmail.value) ||
      !/^.{6,20}$/.test(inputPwd.value)
    ) {
      alert(`아이디 또는 비밀번호가 잘못 입력 되었습니다.
아이디와 비밀번호를 정확히 입력해주세요.`);
      return;
    }

    form.submit();
  }
};
