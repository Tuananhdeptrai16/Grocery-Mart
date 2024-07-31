window.addEventListener("DOMContentLoaded", () => {
  let e = document.querySelector(".auth__btn--Signin"),
    r = document.querySelector(".form__error--confirm");
  console.log(e),
    (e.onclick = (e) => {
      e.preventDefault();
      let t = document.querySelector(".auth__from__email--signIn").value,
        l = document.querySelector(".auth__from__password--signIn").value,
        n = localStorage.getItem("email"),
        i = localStorage.getItem("pass");
      if ("" === t || "" === l) {
        (r.style.display = "block"), (r.innerText = "Please fill in all login information");
        return;
      }
      if (t === n && l === i) window.location.href = "index-logined.html";
      else if ("" !== t || "" !== l) {
        (r.style.display = "block"), (r.innerText = "User or password is incorrect!!");
        return;
      }
    });
});
