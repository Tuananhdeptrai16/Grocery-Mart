window.addEventListener("DOMContentLoaded", () => {
  let e = document.querySelector(".auth__intro-next"),
    t = document.querySelector(".auth__content");
  e.onclick = () => {
    t.classList.toggle("show_Singup");
  };
  let r = document.querySelector(".auth__btn--Signup"),
    o = document.querySelector(".form__error--confirm");
  r.onclick = (e) => {
    e.preventDefault();
    let t = document.querySelector(".auth__from__email").value,
      r = document.querySelector(".auth__from__password").value,
      l = document.querySelector(".auth__from__confirm").value;
    if ("" === t || "" === r || "" === l) {
      (o.style.display = "block"), (o.innerText = "Please fill in complete registration information");
      return;
    }
    if (r !== l) {
      (o.style.display = "block"), (o.innerText = "password incorrect");
      return;
    }
    localStorage.setItem("email", t),
      localStorage.setItem("pass", r),
      console.log("da chuyen"),
      (window.location.href = "sign-in.html");
  };
});
