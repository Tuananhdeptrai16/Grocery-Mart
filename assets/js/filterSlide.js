export const filterSlide = () => {
  let e = document.querySelectorAll(".form__price-slider input"),
    t = document.querySelectorAll(".js__formPrice input"),
    l = document.querySelector(".form__progress"),
    a = 1e3;
  function r() {
    let a = parseInt(t[0].value),
      r = parseInt(t[1].value);
    (l.style.left = (a / e[0].max) * 100 + "%"), (l.style.right = 100 - (r / e[1].max) * 100 + "%");
  }
  t.forEach((l) => {
    l.addEventListener("input", (l) => {
      let u = parseInt(t[0].value),
        i = parseInt(t[1].value);
      i - u >= a &&
        i <= e[1].max &&
        (l.target.classList.contains("js-inputMin") ? (e[0].value = u) : (e[1].value = i), r());
    });
  }),
    e.forEach((l) => {
      l.addEventListener("input", (l) => {
        let u = parseInt(e[0].value),
          i = parseInt(e[1].value);
        i - u < a
          ? l.target.classList.contains("form__range-min")
            ? (e[0].value = i - a)
            : (e[1].value = u + a)
          : ((t[0].value = u), (t[1].value = i), r());
      });
    }),
    r();
};
