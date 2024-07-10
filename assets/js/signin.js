window.addEventListener("DOMContentLoaded", () => {
  const buttonSignIn = document.querySelector(".auth__btn--Signin");
  const textError = document.querySelector(".form__error--confirm");

  buttonSignIn.onclick = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    let email = document.querySelector(".auth__from__email--signIn").value;
    let passWord = document.querySelector(".auth__from__password--signIn").value;
    let emailLocal = localStorage.getItem("email");
    let passLocal = localStorage.getItem("pass");
    console.log(emailLocal, passLocal);
    if (email === "" || passWord === "") {
      textError.style.display = "block";
      textError.innerText = `Vui lòng điền đẩy đủ thông tin đăng nhập`;
      return;
    } else if (email === emailLocal && passWord === passLocal) {
      window.location.href = "index-logined.html";
    }
  };
});
