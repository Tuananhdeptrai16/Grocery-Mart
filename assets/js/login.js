window.addEventListener("DOMContentLoaded", () => {
  const buttonNext = document.querySelector(".auth__intro-next");
  const content = document.querySelector(".auth__content");
  buttonNext.onclick = () => {
    content.classList.toggle("show_Singup");
  };

  const buttonSignUp = document.querySelector(".auth__btn");
  const textError = document.querySelector(".form__error--confirm");

  buttonSignUp.onclick = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    let email = document.querySelector(".auth__from__email").value;
    let passWord = document.querySelector(".auth__from__password").value;
    let confirm = document.querySelector(".auth__from__confirm").value;

    if (email === "" || passWord === "" || confirm === "") {
      textError.style.display = "block";
      textError.innerText = `Vui lòng điền đẩy đủ thông tin đăng ký`;

      return;
    } else if (passWord !== confirm) {
      textError.style.display = "block";
      textError.innerText = `Mật khẩu không khớp`;
      return;
    } else {
      localStorage.setItem("email", email);
      localStorage.setItem("pass", passWord);
      console.log("da chuyen");
      window.location.href = "sign-in.html";
    }
  };
});
