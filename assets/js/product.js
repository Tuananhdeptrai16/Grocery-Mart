import { filterSlide as t } from "./filterSlide.js";
import { toggleShow as r } from "./toggleShowOverlay.js";
window.addEventListener("DOMContentLoaded", () => {
  fetch("./assets/json/category.json")
    .then((t) => t.json())
    .then((t) => {
      (d.categories = t.map((t) => new a(t.imageUrl, t.brand, t.description))), d.showCategoryButton();
    })
    .catch((t) => console.log("error", t)),
    fetch("./assets/json/product.json")
      .then((t) => t.json())
      .then((t) => {
        (d.products = t.map((t) => new e(t.id, t.link, t.name, t.brand, t.price, t.rating, t.weight))),
          d.showProduct(),
          d.changeFilterProduct(),
          d.SaveChangeIdProduct();
      })
      .catch((t) => console.error("Call Fail Api", t));
  class e {
    constructor(t, r, e, a, i, c, s) {
      (this.id = t),
        (this.link = r),
        (this.name = e),
        (this.brand = a),
        (this.price = i),
        (this.rating = c),
        (this.weight = s);
    }
    formatPrice() {
      let t = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
      return t.format(this.price);
    }
  }
  class a {
    constructor(t, r, e) {
      (this.imageUrl = t), (this.brand = r), (this.description = e);
    }
  }
  class i {
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
      <button class="like-btn product-card__like--btn js-HeartClick">
        <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon ">
      </button>
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
      this.productContainerDom.innerHTML = t;
      let r = this.productContainerDom.querySelectorAll(".js-HeartClick");
      r.forEach((t) => {
        t.addEventListener("click", () => {
          let r = t.closest(".js-productItem"),
            e = this.products.find((t) => +t.id == +r.dataset.id);
          (e.dom = new c(e, r, t)), e.dom.addEventClick();
        });
      }),
        this.showFilter();
    }
    showFilter() {
      r(), this.filterSlide();
    }
    filterSlide() {
      t();
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
      t.forEach((r) => {
        r.addEventListener("click", (r) => {
          this.changeCategoryActive(t, r);
        });
      });
    }
    changeCategoryActive(t, r) {
      t.forEach((t) => {
        t === r.currentTarget ? t.classList.add("is-active") : t.classList.remove("is-active");
      });
    }
    changeFilterProduct() {
      let t = document.querySelectorAll(".js-formTags");
      t.forEach((t) => {
        t.addEventListener("click", () => {
          let r = t.textContent,
            e = document.querySelector(".form__brand-input");
          e.value = r;
          let a = document.querySelectorAll(".js-productItem"),
            i = document.querySelector(".filter__submit");
          i.addEventListener("click", () => {
            let t = document.querySelector(".js-filterWeight").value;
            a.forEach((r) => {
              let a = e.value.toLowerCase(),
                i = r.dataset.category.toLowerCase(),
                c = r.dataset.weight;
              console.log(c === t),
                i.includes(a) && c === t
                  ? ((r.closest(".col").style.display = "block"), (r.style.display = "block"))
                  : ((r.closest(".col").style.display = "none"), (r.style.display = "none"));
            });
          });
        });
      });
    }
    SaveChangeIdProduct() {
      let t = this.productContainerDom.querySelectorAll(".js-productThumbs");
      t.forEach((t) => {
        t.addEventListener("click", () => {
          let r = t.closest(".js-productItem"),
            e = r.dataset.id;
          localStorage.setItem("productItemId", e), (window.location.href = "Product-detail-logined.html");
        });
      });
    }
  }
  class c {
    constructor(t, r, e) {
      (this.product = t), (this.productDom = r), (this.buttonDom = e);
    }
    addEventClick() {
      this.buttonDom.addEventListener("click", () => {
        this.addToCartFavourit(), this.tranformHeartToHeartRed();
      });
    }
    tranformHeartToHeartRed() {
      this.buttonDom.outerHTML = ` 
<button class="like-btn product-card__like--btn js-HeartClick">
         <img src="./assets/icons/heart-red.svg" alt="heart" class="like-btn__icon-liked">
      </button>`;
    }
    addToCartFavourit() {
      u.addProducts(this.product);
    }
  }
  class s {
    productsFavourit = [];
    constructor() {
      this.cartFavouritDom = new o(this);
    }
    addProducts(t) {
      this.productsFavourit.push(t), this.cartFavouritDom.showCartProductFavourit();
    }
  }
  class o {
    constructor(t) {
      (this.cartFavourit = t),
        (this.cartFavouritContainerDom = document.querySelector(".js-cartFavouritContainer")),
        this.showCartProductFavourit();
    }
    showCartProductFavourit() {
      var t;
      this.cartFavouritContainerDom.innerHTML = this.cartFavourit.productsFavourit
        .map(
          (t) => `<div class="col">
              <article class="cart-preview-item">
                <div class="cart-preview-item__img-wrap">
                  <img src="${t.link}" alt="" class="cart-preview-item__thumb" />
                </div>
                <h3 class="cart-preview-item__title line-clamp">${t.name}</h3>
                <p class="cart-preview-item__price">${t.formatPrice()}</p>
              </article>
            </div>`
        )
        .join("");
      let r = document.querySelector(".js-quantityFavouritItem");
      r.innerText = (t = this.cartFavourit.productsFavourit.length) <= 10 ? `0${t}` : `${t}`;
    }
  }
  class l {
    products = [];
    constructor() {
      (this.cartDom = new n(this)), this.loadCartFromLocalStorage();
    }
    loadCartFromLocalStorage() {
      let t = JSON.parse(localStorage.getItem("cart")) || [];
      (this.products = t.map((t) => new e(t.id, t.link, t.name, t.brand, t.price, t.rating, t.weight))),
        this.cartDom.showCartProduct(),
        this.showPriceToCartFromLocalStorage();
    }
    showPriceToCartFromLocalStorage() {
      let t = localStorage.getItem("subtotal"),
        r = localStorage.getItem("totalprice"),
        e = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }),
        a = document.querySelector(".js-subTotal"),
        i = document.querySelector(".js-total");
      (a.innerText = `${e.format(t)}`), (i.innerText = `${e.format(r)}`);
    }
    totalPrice() {
      let t = this.products.reduce((t, r) => t * r.price, 0),
        r = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
      return r.format(t);
    }
  }
  class n {
    constructor(t) {
      (this.cart = t),
        (this.cartContainerDom = document.querySelector(".js-cartProductContainer")),
        (this.cartSubTotalDom = document.querySelector(".js-cartSubTotal")),
        (this.cartTotalDom = document.querySelector(".js-cartTotal"));
    }
    showCartProduct() {
      let t = this.cart.products
        .map(
          (t) => `<div class="col">
              <article class="cart-preview-item">
                <div class="cart-preview-item__img-wrap">
                  <img src="${t.link}" alt="" class="cart-preview-item__thumb" />
                </div>
                <h3 class="cart-preview-item__title line-clamp">${t.name}</h3>
                <p class="cart-preview-item__price">${t.formatPrice()}</p>
              </article>
            </div>`
        )
        .join("");
      this.cartContainerDom.innerHTML = t;
      let r = document.querySelector(".js-quantityProductToCart");
      r.innerText = this.cart.products.length;
    }
  }
  let d = new i(),
    u = new s();
  new l();
});
