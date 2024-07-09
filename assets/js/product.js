document.addEventListener("DOMContentLoaded", () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const likedButtons = $$(".like-btn");

  likedButtons.forEach((likedButton) => {
    // Thêm sự kiện nhấn chuột cho từng nút "like-btn"
    likedButton.onclick = (event, index) => {
      // Sử dụng event.target để tham chiếu đến nút đã được nhấn
      event.currentTarget.classList.toggle("like-btn__liked");
    };
  });
});
