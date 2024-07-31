export const zoomItem = () => {
  let e = document.querySelectorAll(".product-preview__thumbs--img"),
    t = document.querySelector(".product-preview__list"),
    o = document.querySelector(".product-ovelay ");
  console.log(t);
  let r = document.querySelector(".product__zoom");
  console.log(e),
    e.forEach((e, l) => {
      (e.onmousemove = () => {
        console.log("dang di chuyen");
        let e = t.offsetWidth;
        t.style.transform = `translateX(${-e * l}px)`;
      }),
        (e.onclick = () => {
          window.innerWidth <= 1140 || (r.classList.toggle("d-none"), o.classList.toggle("d-none"));
        });
    }),
    (o.onclick = () => {
      !(window.innerWidth <= 1140) &&
        (o.classList.contains("overlay") || r.classList.contains("product__zoom")) &&
        (o.classList.add("d-none"), r.classList.add("d-none"));
    });
  let l = document.querySelectorAll(".product__zoom--item"),
    s = document.querySelector(".product__zoom--img");
  s.getAttribute("src"),
    l.forEach((e, t) => {
      e.onmousemove = () => {
        window.innerWidth <= 1140 || s.setAttribute("src", `./assets/img/product/item${t + 1}.png`);
      };
    });
  let c = "prod-tab__item",
    i = "prod-tab__content",
    n = `${c}--current`,
    a = `${i}--current`,
    d = document.querySelectorAll(".js-tabs");
  d.forEach((e) => {
    let t = e.querySelectorAll(`.${c}`),
      o = e.querySelectorAll(`.${i}`);
    t.forEach((t, r) => {
      t.onclick = () => {
        e.querySelector(`.${n}`)?.classList.remove(n),
          e.querySelector(`.${a}`)?.classList.remove(a),
          t.classList.add(n),
          o[r].classList.add(a);
      };
    });
  });
};
