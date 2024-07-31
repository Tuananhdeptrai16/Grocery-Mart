export const toggleShow = () => {
  let s = document.querySelectorAll(".js-toggle"),
    e = document.querySelectorAll(".jsShow"),
    o = document.querySelectorAll(".jsClose");
  s.forEach((s) => {
    let o = s.getAttribute("toggle-class"),
      t = document.querySelector(o);
    if (!o || !t) {
      console.error(
        `Cần th\xeam toggle-class hợp lệ cho: ${s.outerHTML} hoặc kh\xf4ng t\xecm thấy phần tử với selector ${o}`
      );
      return;
    }
    s.onclick = (s) => {
      e.forEach((s) => {
        s.classList.remove("show"), s.classList.add("hide");
      }),
        t.classList.toggle("hide"),
        t.classList.toggle("show"),
        s.stopPropagation();
    };
  }),
    o.forEach((s) => {
      s.onclick = (e) => {
        let o = s.closest(".jsShow");
        o && (o.classList.remove("show"), o.classList.add("hide"), e.stopPropagation());
      };
    }),
    document.querySelectorAll(".modal__overlay").forEach((s) => {
      s.onclick = (e) => {
        let o = s.closest(".jsShow");
        o && (o.classList.remove("show"), o.classList.add("hide"), e.stopPropagation());
      };
    }),
    window.addEventListener("click", (s) => {
      e.forEach((e) => {
        e.contains(s.target) || (e.classList.remove("show"), e.classList.add("hide"));
      });
    });
};
