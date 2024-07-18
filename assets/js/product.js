document.addEventListener("DOMContentLoaded", () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  function fetchProduct() {
    fetch("../assets/json/product.json")
      .then((response) => response.json())
      .then((data) => {
        displayProduct(data.products);
      })
      .catch((error) => console.error("Lỗi khi tải tệp JSON:", error));
  }

  function displayProduct(products) {
    const homeProduct = $(".home__product");

    products.forEach((product, index) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("col");

      userDiv.innerHTML = `
        <article class="product-card">
          <div class="product-card__img-wrap">
            <a href="./Product-detail-logined.html">
              <img src="./assets/img/product/item${product.id}.png" alt="item${product.id}" class="product-card__thumb" />
            </a>
            <button class="like-btn product-card__like--btn">
              <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon" />
              <img src="./assets/icons/heart-red.svg" alt="heart" class="like-btn__icon-liked" />
            </button>
          </div>
          <a href="./Product-detail-logined.html">
            <h3 class="product-card__title">${product.name}</h3>
          </a>
          <p class="product-card__brand">${product.brand}</p>
          <div class="product-card__row">
            <span class="product-card__price">${product.price}</span>
            <img src="./assets/icons/star.svg" alt="star" class="product-card__star" />
            <span class="product-card__score">${product.rating}</span>
          </div>
        </article>
      `;

      homeProduct.appendChild(userDiv);
    });

    // Sau khi hiển thị sản phẩm, gán sự kiện cho nút "like"
    const likedButtons = $$(".like-btn");
    likedButtons.forEach((likedButton) => {
      likedButton.onclick = (event) => {
        event.currentTarget.classList.toggle("like-btn__liked");
        updateLikeCount();
      };
    });

    // Cập nhật số lượng yêu thích
    updateLikeCount();
  }

  function updateLikeCount() {
    const heartReds = $$(".like-btn__liked");
    const topActTitle = $(".top-act__title");

    if (heartReds.length < 10) {
      topActTitle.innerText = `0${heartReds.length}`;
    } else {
      topActTitle.innerText = `${heartReds.length}`;
    }
  }

  fetchProduct();
});
