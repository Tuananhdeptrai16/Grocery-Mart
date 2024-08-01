import { toggleShow } from "./toggleShowOverlay.js";
import { filterSlide } from "./filterSlide.js";
import { fqa } from "./faq.js";
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
        return new Product(
          product.id,
          product.link,
          product.name,
          product.brand,
          product.price,
          product.rating,
          product.weight
        );
      });
      productsDom.showProduct();
      productsDom.changeFilterProduct();
    })
    .catch((error) => console.error("Call Fail Api", error));
  class Product {
    constructor(id, link, name, brand, price, rating, weight) {
      this.id = id;
      this.link = link;
      this.name = name;
      this.brand = brand;
      this.price = price;
      this.rating = rating;
      this.weight = weight;
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
            <article class="product-card js-productItem" data-weight="${product.weight}" data-category ='${
            product.brand
          }' data-id='${product.id}'>
             
              <div class="product-card__img-wrap js-saveChangeIdProduct">
              
                <div>
                  <img src="${product.link}" alt="${product.name}" class="product-card__thumb js-productThumbs">
                </div>
                <a href="./sign-in.html" class="like-btn product-card__like--btn js-HeartClick">
                  <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon ">
                </a>
              </div>
              <a href="#!">
                <h3 class="product-card__title line-clamp">${product.name}</h3>
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
      this.showFilter();
      this.showFqa();
    }
    showFqa() {
      fqa();
    }
    showFilter() {
      toggleShow();
      this.filterSlide();
    }
    filterSlide() {
      filterSlide();
    }
    showCategoryButton() {
      const categoryButtonHTML = this.categories
        .map((category) => {
          return `<div class="col ">
            <a href="#!"  class='js-productCategory' data-name="${category.brand}">
              <article class="cate-item">
                <img src="${category.imageUrl}" alt="item1" class="cate-item__thumb" />
                <div class="cate-item__infor">
                  <h3 class="cate-item__title">${category.brand}</h3>
                  <p class="cate-item__desc line-clamp">${category.description}</p>
                </div>
              </article>
            </a>
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
    changeFilterProduct() {
      const fromTags = document.querySelectorAll(".js-formTags");
      fromTags.forEach((element) => {
        element.addEventListener("click", () => {
          let text = element.textContent;
          const input = document.querySelector(".form__brand-input");
          input.value = text;
          const productDoms = document.querySelectorAll(".js-productItem");
          const filterShow = document.querySelector(".filter__submit");
          filterShow.addEventListener("click", () => {
            const weight = document.querySelector(".js-filterWeight").value;
            productDoms.forEach((product) => {
              const filterSelected = input.value.toLowerCase();
              const productBrand = product.dataset.category.toLowerCase();
              const productWeight = product.dataset.weight;
              if (productBrand.includes(filterSelected) && productWeight === weight) {
                product.closest(".col").style.display = "block";
                product.style.display = "block";
              } else {
                product.closest(".col").style.display = "none";
                product.style.display = "none";
              }
            });
          });
        });
      });
    }
  }
  const productsDom = new ProductsDOM();
});
