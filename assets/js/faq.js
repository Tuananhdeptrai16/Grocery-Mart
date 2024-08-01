export const fqa = () => {
  console.log("Run");
  const fqaWrappers = document.querySelectorAll(".js__wraper");
  console.log(fqaWrappers);
  fqaWrappers.forEach((question) => {
    const faqQuestion = question.querySelector(".js_faqQuestion");
    faqQuestion.addEventListener("click", () => {
      faqQuestion.classList.toggle("js__rotate");
      const faqBottom = question.querySelector(".faq__bottom");
      faqBottom.classList.toggle("js_show");
    });
  });
};
