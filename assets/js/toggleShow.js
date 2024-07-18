window.document.addEventListener("DOMContentLoaded", () => {
  const btnClick = document.querySelector(".filter-btn");
  const jsShow = document.querySelector(".jsShow");
  const jsClose = document.querySelector(".jsClose");
  console.log(userClick);
  btnClick.onclick = () => {
    jsShow.classList.toggle("show");
  };
  close.onclick = () => {
    jsShow.classList.toggle("show");
  };
  jsClose.onclick = () => {
    jsShow.classList.remove("show");
  };
  // Bắt sự kiện click trên toàn cửa sổ
  window.addEventListener("click", (event) => {
    // Kiểm tra nếu click không phải là từ .filter-btn hoặc bên trong .filter
    if (!btnClick.contains(event.target) && !jsShow.contains(event.target)) {
      jsShow.classList.remove("show");
    }
  });
});
