window.addEventListener("DOMContentLoaded", () => {
  const itemThumbs = document.querySelectorAll(".product-preview__thumbs--img");
  const itemList = document.querySelector(".product-preview__list");
  const overlay = document.querySelector(".product-ovelay ");
  const productZoom = document.querySelector(".product__zoom");
  console.log(productZoom);
  itemThumbs.forEach((element, index) => {
    element.onmousemove = () => {
      const imgWidth = itemList.offsetWidth;
      itemList.style.transform = `translateX(${-imgWidth * index}px)`;
    };
    element.onclick = () => {
      productZoom.classList.toggle("d-none");
      overlay.classList.toggle("d-none");
    };
  });
  overlay.onclick = () => {
    if (overlay.classList.contains("overlay") || productZoom.classList.contains("product__zoom")) {
      overlay.classList.add("d-none"); // Changed from remove to add
      productZoom.classList.add("d-none"); // Changed from remove to add
    }
  };
  const itemZooms = document.querySelectorAll(".product__zoom--item");
  const itemListZoom = document.querySelector(".product__zoom--img");
  const linkImgs = itemListZoom.getAttribute("src");
  itemZooms.forEach((element, index) => {
    element.onmousemove = () => {
      itemListZoom.setAttribute("src", `./assets/img/product/item${index + 1}.png`);
    };
  });
});
