const fqaWrappers = document.querySelectorAll(".js__wraper");
window.addEventListener("DOMContentLoaded", () => {
  fqaWrappers.forEach((question) => {
    const faqQuestion = question.querySelector(".js_faqQuestion");
    faqQuestion.addEventListener("click", () => {
      faqQuestion.classList.toggle("js__rotate");
      const faqBottom = question.querySelector(".faq__bottom");
      faqBottom.classList.toggle("js_show");
    });
  });
});
