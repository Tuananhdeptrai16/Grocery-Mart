window.document.addEventListener("DOMContentLoaded", () => {
  const buttonSubmit = document.querySelector(".auth__btn ");
  const textError = document.querySelector(".form__error");
  const form = document.querySelector(".auth__form--forgot");
  const formSuccess = document.querySelector(".message--success");
  buttonSubmit.onclick = (event) => {
    event.preventDefault();
    const email = document.querySelector(".form__input").value;
    if (email === "") {
      textError.style.display = "block";
      textError.innerText = "Please enter Email !!!";
    } else {
      form.classList.add("d-none");
      if (formSuccess.classList.contains("d-none")) {
        formSuccess.classList.remove("d-none");
        formSuccess.classList.add("d-block");
      }
    }
  };
});
