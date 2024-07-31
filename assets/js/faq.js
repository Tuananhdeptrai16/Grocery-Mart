const fqaWrappers = document.querySelectorAll(".js__wraper");
window.addEventListener("DOMContentLoaded", () => {
  fqaWrappers.forEach((e) => {
    let t = e.querySelector(".js_faqQuestion");
    t.addEventListener("click", () => {
      t.classList.toggle("js__rotate");
      let s = e.querySelector(".faq__bottom");
      s.classList.toggle("js_show");
    });
  });
});
