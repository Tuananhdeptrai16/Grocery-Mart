window.document.addEventListener("DOMContentLoaded", () => {
  const btnClick = document.querySelector(".filter-btn");
  const filter = document.querySelector(".filter");
  const close = document.querySelector(".filter__cancle");

  btnClick.onclick = () => {
    filter.classList.toggle("show");
  };

  close.onclick = () => {
    filter.classList.toggle("show");
  };

  // Bắt sự kiện click trên toàn cửa sổ
  window.addEventListener("click", (event) => {
    // Kiểm tra nếu click không phải là từ .filter-btn hoặc bên trong .filter
    if (!btnClick.contains(event.target) && !filter.contains(event.target)) {
      filter.classList.remove("show");
    }
  });
});
