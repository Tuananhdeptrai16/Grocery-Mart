window.addEventListener("DOMContentLoaded", () => {
  const itemThumbs = document.querySelectorAll(".product-preview__thumbs--img");
  const itemList = document.querySelector(".product-preview__list");
  const overlay = document.querySelector(".product-ovelay ");
  const productZoom = document.querySelector(".product__zoom");
  itemThumbs.forEach((element, index) => {
    element.onmousemove = () => {
      console.log("Dang chay");
      const imgWidth = itemList.offsetWidth;
      itemList.style.transform = `translateX(${-imgWidth * index}px)`;
    };
    element.onclick = () => {
      if (window.innerWidth <= 1140) return;
      productZoom.classList.toggle("d-none");
      overlay.classList.toggle("d-none");
    };
  });
  overlay.onclick = () => {
    if (window.innerWidth <= 1140) return;
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
      if (window.innerWidth <= 1140) return;
      itemListZoom.setAttribute("src", `./assets/img/product/item${index + 1}.png`);
    };
  });
});
window.addEventListener("DOMContentLoaded", () => {
  const tabsSelector = "prod-tab__item";
  const contentSelector = "prod-tab__content";
  const tabActive = `${tabsSelector}--current`;
  const contentActive = `${contentSelector}--current`;
  const tabContainers = document.querySelectorAll(".js-tabs");
  tabContainers.forEach((tabContainer) => {
    console.log(tabContainer);
    const tabs = tabContainer.querySelectorAll(`.${tabsSelector}`);
    const contents = tabContainer.querySelectorAll(`.${contentSelector}`);
    tabs.forEach((tab, index) => {
      tab.onclick = () => {
        tabContainer.querySelector(`.${tabActive}`)?.classList.remove(tabActive);
        tabContainer.querySelector(`.${contentActive}`)?.classList.remove(contentActive);
        tab.classList.add(tabActive);
        contents[index].classList.add(contentActive);
      };
    });
  });
});
