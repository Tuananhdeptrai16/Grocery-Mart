window.document.addEventListener("DOMContentLoaded", () => {
  let t = $(".js__action-user"),
    e = $(".user__action"),
    s = $(".user__lightmode"),
    i = $(".user__lightmode--text-active"),
    n = document.documentElement;
  (t.onclick = () => {
    e.classList.toggle("show");
  }),
    window.addEventListener("click", (s) => {
      e.contains(s.target) || t.contains(s.target) || e.classList.remove("show");
    }),
    (s.onclick = () => {
      let t = n.getAttribute("class");
      t && "dark" === t && (n.setAttribute("class", "light"), (i.innerText = "Dark")),
        t && "light" === t && (n.setAttribute("class", "dark"), (i.innerText = "Bright"));
    });
});
