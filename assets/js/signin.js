window.addEventListener("DOMContentLoaded", () => {
  const buttonSignIn = document.querySelector(".auth__btn--Signin");
  const textError = document.querySelector(".form__error--confirm");

  buttonSignIn.onclick = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    let email = document.querySelector(".auth__from__email--signIn").value;
    let passWord = document.querySelector(".auth__from__password--signIn").value;
    let emailLocal = localStorage.getItem("email");
    let passLocal = localStorage.getItem("pass");
    if (email === "" || passWord === "") {
      textError.style.display = "block";
      textError.innerText = `Please fill in all login information`;
      return;
    } else if (email === emailLocal && passWord === passLocal) {
      window.location.href = "index-logined.html";
    } else if (email !== "" || passWord !== "") {
      textError.style.display = "block";
      textError.innerText = `User or password is incorrect!!`;
      return;
    }
  };
});
