window.addEventListener("DOMContentLoaded", () => {
  fetch("./assets/json/category.json")
    .then((response) => response.json())
    .then((json) => {
      productsDom.categories = json.map((category) => {
        return new Category(category.imageUrl, category.brand, category.description);
      });
      productsDom.showCategoryButton();
    })
    .catch((error) => console.log("error", error));

  fetch("./assets/json/product.json")
    .then((response) => response.json())
    .then((data) => {
      productsDom.products = data.map((product) => {
        return new Product(product.link, product.name, product.brand, product.price, product.rating);
      });

      productsDom.showProduct();
    })
    .catch((error) => console.error("Call Fail Api", error));
  class Product {
    constructor(link, name, brand, price, rating) {
      this.link = link;
      this.name = name;
      this.brand = brand;
      this.price = price;
      this.rating = rating;
    }
    formatPrice() {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      return formatter.format(this.price);
    }
  }

  class Category {
    constructor(imageUrl, brand, description) {
      this.imageUrl = imageUrl;
      this.brand = brand;
      this.description = description;
    }
  }

  class ProductsDOM {
    products = [];
    categories = [];

    constructor() {
      this.categoryContainerDom = document.querySelector(".js-productCategoryContainer");
      this.productContainerDom = document.querySelector(".js-productContainer");
    }
    showProduct() {
      const productHTML = this.products
        .map((product) => {
          return `<div class="col">
            <article class="product-card js-productItem" data-category ='${product.brand}'>
              <div class="product-card__img-wrap">
                <a href="./Product-detail-logined.html">
                  <img src="${product.link}" alt="${product.name}" class="product-card__thumb">
                </a>
                <button class="like-btn product-card__like--btn">
                  <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon">
                  <img src="./assets/icons/heart-red.svg" alt="heart" class="like-btn__icon-liked">
                </button>
              </div>
              <a href="#!">
                <h3 class="product-card__title">${product.name}</h3>
              </a>
              <p class="product-card__brand">${product.brand}</p>
              <div class="product-card__row">
                <span class="product-card__price">${product.formatPrice()}</span>
                <img src="./assets/icons/star.svg" alt="star" class="product-card__star">
                <span class="product-card__score">${product.rating}</span>
              </div>
            </article>
          </div>`;
        })
        .join("");
      this.productContainerDom.innerHTML = productHTML;
    }

    showCategoryButton() {
      const categoryButtonHTML = this.categories
        .map((category) => {
          return `<div class="col ">
            <div  class='js-productCategory' data-name="${category.brand}">
              <article class="cate-item">
                <img src="${category.imageUrl}" alt="item1" class="cate-item__thumb" />
                <div class="cate-item__infor">
                  <h3 class="cate-item__title">${category.brand}</h3>
                  <p class="cate-item__desc line-clamp">${category.description}</p>
                </div>
              </article>
            </div>
          </div>`;
        })
        .join("");
      this.categoryContainerDom.innerHTML = categoryButtonHTML;
      this.setCategoryButtonClickEvent();
    }
    setCategoryButtonClickEvent() {
      const productCategoryDoms = this.categoryContainerDom.querySelectorAll(".js-productCategory");
      productCategoryDoms.forEach((dom) => {
        dom.addEventListener("click", (event) => {
          this.changeCategoryActive(productCategoryDoms, event);
          this.showProductOfCategory(event);
        });
      });
    }
    changeCategoryActive(productCategoryDoms, event) {
      productCategoryDoms.forEach((dom) => {
        if (dom === event.currentTarget) {
          dom.classList.add("is-active");
        } else {
          dom.classList.remove("is-active");
        }
      });
    }
    showProductOfCategory(event) {
      const productDoms = this.productContainerDom.querySelectorAll(".js-productItem");
      const categorySelected = event.currentTarget.dataset.name;
      console.log(categorySelected);

      productDoms.forEach((product) => {
        if (product.dataset.category === categorySelected) {
          product.closest(".col").style.display = "block";
          product.style.display = "block";
        } else if (categorySelected === "All") {
          product.closest(".col").style.display = "block";
          product.style.display = "block";
        } else {
          product.closest(".col").style.display = "none";
          product.style.display = "none";
        }
      });
    }
  }

  const productsDom = new ProductsDOM();

  console.log(productsDom);
});
