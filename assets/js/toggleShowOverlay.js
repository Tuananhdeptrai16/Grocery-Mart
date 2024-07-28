function toggleShow() {
  const modalTriggers = document.querySelectorAll(".js-toggle");
  const allModals = document.querySelectorAll(".jsShow");
  const closes = document.querySelectorAll(".jsClose");

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
      allModals.forEach((modal) => {
        modal.classList.remove("show");
        modal.classList.add("hide");
      });

      targetModal.classList.toggle("hide");
      targetModal.classList.toggle("show");
      event.stopPropagation();
    };
  });

  closes.forEach((closeButton) => {
    closeButton.onclick = (event) => {
      const modal = closeButton.closest(".jsShow");
      if (modal) {
        modal.classList.remove("show");
        modal.classList.add("hide");
        event.stopPropagation();
      }
    };
  });

  document.querySelectorAll(".modal__overlay").forEach((overlay) => {
    overlay.onclick = (event) => {
      const modal = overlay.closest(".jsShow");
      if (modal) {
        modal.classList.remove("show");
        modal.classList.add("hide");
        event.stopPropagation();
      }
    };
  });

  window.addEventListener("click", (event) => {
    allModals.forEach((modal) => {
      if (!modal.contains(event.target)) {
        modal.classList.remove("show");
        modal.classList.add("hide");
      }
    });
  });
}

export { toggleShow };
