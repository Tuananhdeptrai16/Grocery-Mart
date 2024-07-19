window.document.addEventListener("DOMContentLoaded", () => {
  const modalTriggers = document.querySelectorAll(".js-toggle"); // Nút mở modal
  const allModals = document.querySelectorAll(".modal"); // Tất cả các modal

  modalTriggers.forEach((trigger) => {
    const targetSelector = trigger.getAttribute("toggle-class");
    const targetModal = document.querySelector(targetSelector);

    if (!targetSelector || !targetModal) {
      console.error(
        `Cần thêm toggle-class hợp lệ cho: ${trigger.outerHTML} hoặc không tìm thấy phần tử với selector ${targetSelector}`
      );
      return;
    }

    trigger.onclick = (event) => {
      // Ẩn tất cả các modal khác
      allModals.forEach((modal) => {
        modal.classList.remove("show");
        modal.classList.add("hide");
      });

      // Hiển thị modal mục tiêu
      targetModal.classList.toggle("hide");
      targetModal.classList.toggle("show");
      event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên window
    };
  });

  // Đóng modal khi nhấp vào nút đóng
  document.querySelectorAll(".jsClose").forEach((closeButton) => {
    closeButton.onclick = (event) => {
      const modal = closeButton.closest(".modal");
      if (modal) {
        modal.classList.remove("show");
        modal.classList.add("hide");
        event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên window
      }
    };
  });

  // Đóng modal khi nhấp vào overlay
  document.querySelectorAll(".modal__overlay").forEach((overlay) => {
    overlay.onclick = (event) => {
      const modal = overlay.closest(".modal");
      if (modal) {
        modal.classList.remove("show");
        modal.classList.add("hide");
        event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên window
      }
    };
  });

  // Đóng modal khi nhấp ra ngoài modal
  window.addEventListener("click", (event) => {
    allModals.forEach((modal) => {
      if (!modal.contains(event.target)) {
        modal.classList.remove("show");
        modal.classList.add("hide");
      }
    });
  });
});
