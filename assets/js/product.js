document.addEventListener("DOMContentLoaded", () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const likedButtons = $$(".like-btn");
  console.log(likedButtons);

  likedButtons.forEach((likedButton) => {
    console.log(likedButton);
    // Thêm sự kiện nhấn chuột cho từng nút "like-btn"
    likedButton.onclick = (event, index) => {
      console.log(event.currentTarget);
      // Sử dụng event.target để tham chiếu đến nút đã được nhấn
      event.currentTarget.classList.toggle("like-btn__liked");
    };
  });
});
