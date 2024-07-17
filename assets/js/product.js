document.addEventListener("DOMContentLoaded", () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  function updateLikeCount() {
    const heartReds = document.querySelectorAll(".like-btn__liked");
    function testLiked() {
      if (heartReds.length < 10) {
        document.querySelector(".top-act__title").innerText = `0${heartReds.length}`;
      } else {
        document.querySelector(".top-act__title").innerText = `${heartReds.length}`;
      }
    }
    testLiked();
  }
  const likedButtons = $$(".like-btn");
  likedButtons.forEach((likedButton) => {
    // Thêm sự kiện nhấn chuột cho từng nút "like-btn"
    likedButton.onclick = (event, index) => {
      // Sử dụng event.target để tham chiếu đến nút đã được nhấn
      event.currentTarget.classList.toggle("like-btn__liked");
      updateLikeCount();
    };
  });
});
