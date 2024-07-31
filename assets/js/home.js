import { toggleShow as t } from "./toggleShowOverlay.js";
import { filterSlide as e } from "./filterSlide.js";
window.addEventListener("DOMContentLoaded", () => {
  fetch("./assets/json/category.json")
    .then((t) => t.json())
    .then((t) => {
      (c.categories = t.map((t) => new a(t.imageUrl, t.brand, t.description))), c.showCategoryButton();
    })
    .catch((t) => console.log("error", t)),
    fetch("./assets/json/product.json")
      .then((t) => t.json())
      .then((t) => {
        (c.products = t.map((t) => new r(t.id, t.link, t.name, t.brand, t.price, t.rating, t.weight))),
          c.showProduct(),
          c.changeFilterProduct();
      })
      .catch((t) => console.error("Call Fail Api", t));
  class r {
    constructor(t, e, r, a, s, c, i) {
      (this.id = t),
        (this.link = e),
        (this.name = r),
        (this.brand = a),
        (this.price = s),
        (this.rating = c),
        (this.weight = i);
    }
    formatPrice() {
      let t = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
      return t.format(this.price);
    }
  }
  class a {
    constructor(t, e, r) {
      (this.imageUrl = t), (this.brand = e), (this.description = r);
    }
  }
  class s {
    products = [];
    categories = [];
    constructor() {
      (this.categoryContainerDom = document.querySelector(".js-productCategoryContainer")),
        (this.productContainerDom = document.querySelector(".js-productContainer"));
    }
    showProduct() {
      let t = this.products
        .map(
          (t) => `<div class="col">
  <article class="product-card js-productItem" data-weight="${t.weight}" data-category ='${t.brand}' data-id='${t.id}'>
   
    <div class="product-card__img-wrap js-saveChangeIdProduct">
    
      <div>
        <img src="${t.link}" alt="${t.name}" class="product-card__thumb js-productThumbs">
      </div>
      <a href="./sign-in.html" class="like-btn product-card__like--btn js-HeartClick">
        <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon ">
      </a>
    </div>
    <a href="#!">
      <h3 class="product-card__title line-clamp">${t.name}</h3>
    </a>
    <p class="product-card__brand">${t.brand}</p>
    <div class="product-card__row">
      <span class="product-card__price">${t.formatPrice()}</span>
      <img src="./assets/icons/star.svg" alt="star" class="product-card__star">
      <span class="product-card__score">${t.rating}</span>
    </div>
  </article>
</div>`
        )
        .join("");
      (this.productContainerDom.innerHTML = t), this.showFilter();
    }
    showFilter() {
      t(), this.filterSlide();
    }
    filterSlide() {
      e();
    }
    showCategoryButton() {
      let t = this.categories
        .map(
          (t) => `<div class="col ">
  <a href="#!"  class='js-productCategory' data-name="${t.brand}">
    <article class="cate-item">
      <img src="${t.imageUrl}" alt="item1" class="cate-item__thumb" />
      <div class="cate-item__infor">
        <h3 class="cate-item__title">${t.brand}</h3>
        <p class="cate-item__desc line-clamp">${t.description}</p>
      </div>
    </article>
  </a>
</div>`
        )
        .join("");
      (this.categoryContainerDom.innerHTML = t), this.setCategoryButtonClickEvent();
    }
    setCategoryButtonClickEvent() {
      let t = this.categoryContainerDom.querySelectorAll(".js-productCategory");
      t.forEach((e) => {
        e.addEventListener("click", (e) => {
          this.changeCategoryActive(t, e);
        });
      });
    }
    changeCategoryActive(t, e) {
      t.forEach((t) => {
        t === e.currentTarget ? t.classList.add("is-active") : t.classList.remove("is-active");
      });
    }
    changeFilterProduct() {
      let t = document.querySelectorAll(".js-formTags");
      t.forEach((t) => {
        t.addEventListener("click", () => {
          let e = t.textContent,
            r = document.querySelector(".form__brand-input");
          r.value = e;
          let a = document.querySelectorAll(".js-productItem"),
            s = document.querySelector(".filter__submit");
          s.addEventListener("click", () => {
            let t = document.querySelector(".js-filterWeight").value;
            a.forEach((e) => {
              let a = r.value.toLowerCase(),
                s = e.dataset.category.toLowerCase(),
                c = e.dataset.weight;
              s.includes(a) && c === t
                ? ((e.closest(".col").style.display = "block"), (e.style.display = "block"))
                : ((e.closest(".col").style.display = "none"), (e.style.display = "none"));
            });
          });
        });
      });
    }
  }
  let c = new s();
});
