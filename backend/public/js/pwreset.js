window.onload = function () {
  let inputEmail = document.getElementById("email");
  inputEmail.addEventListener("input", checkUserEmail);

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
};
