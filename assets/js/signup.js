window.addEventListener("DOMContentLoaded", () => {
  const buttonNext = document.querySelector(".auth__intro-next");
  const content = document.querySelector(".auth__content");
  buttonNext.onclick = () => {
    content.classList.toggle("show_Singup");
  };

  const buttonSignUp = document.querySelector(".auth__btn--Signup");
  const textError = document.querySelector(".form__error--confirm");
  buttonSignUp.onclick = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    let email = document.querySelector(".auth__from__email").value;
    let passWord = document.querySelector(".auth__from__password").value;
    let confirm = document.querySelector(".auth__from__confirm").value;

    if (email === "" || passWord === "" || confirm === "") {
      textError.style.display = "block";
      textError.innerText = `Please fill in complete registration information`;

      return;
    } else if (passWord !== confirm) {
      textError.style.display = "block";
      textError.innerText = `password incorrect`;
      return;
    } else {
      localStorage.setItem("email", email);
      localStorage.setItem("pass", passWord);
      console.log("da chuyen");
      window.location.href = "sign-in.html";
    }
  };
});
