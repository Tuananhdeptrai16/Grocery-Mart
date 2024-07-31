window.document.addEventListener("DOMContentLoaded", () => {
  let e = document.querySelector(".auth__btn "),
    t = document.querySelector(".form__error"),
    o = document.querySelector(".auth__form--forgot"),
    r = document.querySelector(".message--success");
  e.onclick = (e) => {
    e.preventDefault();
    let s = document.querySelector(".form__input").value;
    "" === s
      ? ((t.style.display = "block"), (t.innerText = "Please enter Email !!!"))
      : (o.classList.add("d-none"),
        r.classList.contains("d-none") && (r.classList.remove("d-none"), r.classList.add("d-block")));
  };
});
