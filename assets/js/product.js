document.addEventListener("DOMContentLoaded", () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  function fetchProduct() {
    fetch("./assets/json/product.json")
      .then((reponse) => reponse.json())
      .then((data) => {
        displayProduct(data.products);
      })
      .catch((error) => console.error("Call Fail Api", error));
  }
  function displayProduct(products) {
    const homeProduct = $(".home__product");
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("col");
      //index-logined.html
      if (window.location.pathname.includes("index-logined.html")) {
        productDiv.innerHTML = `
        <article class="product-card">
                <div class="product-card__img-wrap">
                  <a href="./Product-detail.html">
                    <img src="${product.link}" alt="item1" class="product-card__thumb" />
                  </a>
                  <button class="like-btn product-card__like--btn">
                    <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon" />
                    <img src="./assets/icons/heart-red.svg" alt="heart" class="like-btn__icon-liked" />
                  </button>
                </div>
                <a href="#!">
                  <h3 class="product-card__title line-clamp">${product.name}</h3>
                </a>
                <p class="product-card__brand">${product.brand}</p>
                <div class="product-card__row">
                  <span class="product-card__price">${product.price}$</span>
                  <img src="./assets/icons/star.svg" alt="star" class="product-card__star" />
                  <span class="product-card__score">${product.rating}</span>
                </div>
              </article>`;
      } else if (window.location.pathname.includes("index.html")) {
        productDiv.innerHTML = `
        <article class="product-card">
                <div class="product-card__img-wrap">
                  <a href="./Product-detail.html">
                    <img src="${product.link}" alt="item1" class="product-card__thumb" />
                  </a>
                  <button onclick="window.location.href= 'sign-in.html'" class="like-btn product-card__like--btn">
                    <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon" />
                    <img src="./assets/icons/heart-red.svg" alt="heart" class="like-btn__icon-liked" />
                  </button>
                </div>
                <a href="#!">
                  <h3 class="product-card__title line-clamp">${product.name}</h3>
                </a>
                <p class="product-card__brand">${product.brand}</p>
                <div class="product-card__row">
                  <span class="product-card__price">${product.price}$</span>
                  <img src="./assets/icons/star.svg" alt="star" class="product-card__star" />
                  <span class="product-card__score">${product.rating}</span>
                </div>
              </article>`;
      }
      homeProduct.appendChild(productDiv);
    });
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
