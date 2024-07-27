window.addEventListener("DOMContentLoaded", () => {
  const clickHandle = document.querySelector(".product-card__img-wrap");

  clickHandle.addEventListener("click", () => {
    const elementId = clickHandle.dataset.id;
    console.log(elementId);
    localStorage.setItem("selectedProductId", elementId);
  });
});
