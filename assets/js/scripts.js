const $ = document.querySelector.bind(document),
  $$ = document.querySelectorAll.bind(document);
function load(e, t) {
  let n = localStorage.getItem(t);
  n && ($(e).innerHTML = n),
    fetch(t)
      .then((e) => e.text())
      .then((s) => {
        s !== n && (($(e).innerHTML = s), localStorage.setItem(t, s));
      })
      .finally(() => {
        window.dispatchEvent(new Event("template-loaded"));
      });
}
function isHidden(e) {
  if (!e || "none" === window.getComputedStyle(e).display) return !0;
  let t = e.parentElement;
  for (; t; ) {
    if ("none" === window.getComputedStyle(t).display) return !0;
    t = t.parentElement;
  }
  return !1;
}
function debounce(e, t = 300) {
  let n;
  return (...s) => {
    clearTimeout(n),
      (n = setTimeout(() => {
        e.apply(this, s);
      }, t));
  };
}
const calArrowPos = debounce(() => {
  if (isHidden($(".js-dropdown-list"))) return;
  let e = $$(".js-dropdown-list > li");
  e.forEach((e) => {
    let t = e.offsetLeft + e.offsetWidth / 2;
    e.style.setProperty("--arrow-left-pos", `${t}px`);
  });
});
function handleActiveMenu() {
  let e = $$(".js-dropdown"),
    t = $$(".js-menu-list"),
    n = "menu-column__item--active",
    s = (e) => {
      e.querySelector(`.${n}`)?.classList.remove(n);
    },
    o = () => {
      t.forEach((e) => {
        let t = e.children;
        t.length &&
          (s(e),
          window.innerWidth > 991 && t[0].classList.add(n),
          Array.from(t).forEach((t) => {
            (t.onmouseenter = () => {
              window.innerWidth <= 991 || (s(e), t.classList.add(n));
            }),
              (t.onclick = () => {
                window.innerWidth > 991 || (s(e), t.classList.add(n), t.scrollIntoView());
              });
          }));
      });
    };
  o(),
    e.forEach((e) => {
      e.onmouseleave = () => o();
    });
}
window.addEventListener("resize", calArrowPos),
  window.addEventListener("template-loaded", calArrowPos),
  window.addEventListener("template-loaded", handleActiveMenu),
  document.addEventListener("DOMContentLoaded", function () {
    let e = $(".top-bar__more"),
      t = $(".navbar-ovelay"),
      n = $(".navbar"),
      s = $(".navbar__close-btn");
    (e.onclick = (e) => {
      e.stopPropagation(), window.innerWidth > 991 || (t.classList.toggle("show"), n.classList.toggle("show"));
    }),
      (s.onclick = (e) => {
        e.stopPropagation(),
          !(window.innerWidth > 991) &&
            t.classList.contains("show") &&
            n.classList.contains("show") &&
            (t.classList.remove("show"), n.classList.remove("show"));
      }),
      t.addEventListener("click", () => {
        !(window.innerWidth > 991) &&
          t.classList.contains("show") &&
          n.classList.contains("show") &&
          (t.classList.remove("show"), n.classList.remove("show"));
      });
  }),
  window.addEventListener("template-loaded", () => {
    let e = $$(".js-dropdown-list > li > a");
    e.forEach((e) => {
      e.onclick = () => {
        if (window.innerWidth > 991) return;
        let t = e.closest("li");
        t.classList.toggle("navbar__item--active");
      };
    });
  });
