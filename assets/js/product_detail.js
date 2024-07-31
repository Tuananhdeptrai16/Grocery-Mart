import { zoomItem as t } from "./product-detail.js";
window.addEventListener("DOMContentLoaded", () => {
  fetch("./assets/json/product.json")
    .then((t) => t.json())
    .then((t) => {
      (a.products = t.map((t) => new s(t.id, t.link, t.name, t.brand, t.price, t.rating, t.weight))), a.showProduct();
    })
    .catch((t) => console.error("Call Fail Api", t));
  class s {
    constructor(t, s, r, i, o, c, a) {
      (this.id = t),
        (this.link = s),
        (this.name = r),
        (this.brand = i),
        (this.price = o),
        (this.rating = c),
        (this.weight = a);
    }
    formatPrice() {
      let t = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
      return t.format(this.price);
    }
  }
  class r {
    products = [];
    constructor() {
      this.ProductContainerDom = document.querySelector(".js-productWrap");
    }
    showProduct() {
      let t = localStorage.getItem("productItemId"),
        s = this.products.find((s) => +s.id == +t),
        r = `
  <div class="col-5 col-xl-6 col-lg-12">
    <div class="product-preview">
      <div class="product-preview__list">
        <div class="product-preview__item">
          <img src="${s.link}" alt="" class="product-preview__img">
        </div>
        <div class="product-preview__item">
          <img src="./assets/img/product/item2.png" alt="" class="product-preview__img">
        </div>
        <div class="product-preview__item">
          <img src="./assets/img/product/item3.png" alt="" class="product-preview__img">
        </div>
        <div class="product-preview__item">
          <img src="./assets/img/product/item4.png" alt="" class="product-preview__img">
        </div>
      </div>
      <div class="product-preview__thumbs">
        <img src="./assets/img/product/item1.png" alt="" class="product-preview__thumbs--img product-preview__thumbs--current">
        <img src="./assets/img/product/item2.png" alt="" class="product-preview__thumbs--img">
        <img src="./assets/img/product/item3.png" alt="" class="product-preview__thumbs--img">
        <img src="./assets/img/product/item1.jpg" alt="" class="product-preview__thumbs--img">
      </div>
    </div>
    <!-- size -->
  </div>
  <div class="col-7 col-xl-6 col-lg-12">
    <section class="product-info">
      <h1 class="product-info__heading">${s.name}</h1>
      <div class="row">
        <div class="col-5 col-xxl-6 col-xl-12">
          <div class="prod-prop">
            <img src="./assets/icons/star.svg" alt="star" class="prod-prop__icon">
            <h4 class="prod-prop__title">(${s.rating}) 1100 reviews</h4>
          </div>
          <div class="product__size">
            <label class="form__label prod-prop__label">Size/Weight</label>
            <div class="form-group">
              <div class="form__size-select-wrap product__size--select-wrap">
                <div class="form__size-select" style="--width: 146px">
                  500g
                  <img src="./assets/icons/select-arrow.svg" alt="down" class="form__size-select-arrow icon">
                </div>
                <div class="form__separate"></div>
                <div class="form-select product__size--select">
                  Gram
                  <img src="./assets/icons/select-arrow.svg" alt="down" class="form__size-select-arrow icon">
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-tags">
                <button class="form-tag prod-prop__tag">Small</button>
                <button class="form-tag prod-prop__tag">Medium</button>
                <button class="form-tag prod-prop__tag">Large</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7 col-xxl-6 col-xl-12">
          <div class="prod-props">
            <div class="prod-prop">
              <img src="./assets/icons/document.svg" alt="star" class="prod-prop__icon icon">
              <h4 class="prod-prop__title">Compare</h4>
            </div>
            <div class="prod-prop">
              <img src="./assets/icons/buy.svg" alt="star" class="prod-prop__icon icon">
              <div>
                <h4 class="prod-prop__title">Delivery</h4>
                <p class="prod-prop__desc">From $6 for 1-3 days</p>
              </div>
            </div>
            <div class="prod-prop">
              <img src="./assets/icons/bag.svg" alt="star" class="prod-prop__icon icon">
              <div>
                <h4 class="prod-prop__title">Delivery</h4>
                <p class="prod-prop__desc">From $6 for 1-3 days</p>
              </div>
            </div>
          </div>
          <div class="prod-infor__card">
            <div class="prod-infor__row">
              <span class="prod-infor__price">${s.formatPrice()}</span>
              <span class="prod-infor__tax">10%</span>
            </div>
            <span class="prod-infor__total--price">${s.formatPrice()}</span>
            <div class="prod-infor__row prod-infor__btn-wrap">
              <button class="btn btn--primary prod-infor__btn js-productItemButton">Add to cart</button>
              <button class="like-btn prod-infor__like--btn">
                <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon">
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
`;
      this.ProductContainerDom.innerHTML = r;
      let o = this.ProductContainerDom.querySelector(".js-productItemButton"),
        c = this.products.find((s) => +s.id == +t);
      (c.domInstance = new i(c, o)), c.domInstance.addEventClick(), this.showZoomProduct();
    }
    showZoomProduct() {
      t();
    }
  }
  class i {
    constructor(t, s) {
      (this.product = t), (this.buttonDom = s);
    }
    addEventClick() {
      this.buttonDom.addEventListener("click", () => {
        this.addToCart();
      });
    }
    addToCart() {
      e.addProduct(this.product);
    }
  }
  class o {
    products = [];
    constructor() {
      (this.cartDom = new c(this)), this.loadCartFromLocalStorage();
    }
    addProduct(t) {
      this.products.push(t), this.saveCartToLocalStorage(), this.cartDom.showCartProduct();
    }
    saveCartToLocalStorage() {
      let t = this.products.map((t) => {
        let { domInstance: s, ...r } = t;
        return r;
      });
      localStorage.setItem("cart", JSON.stringify(t));
    }
    loadCartFromLocalStorage() {
      let t = JSON.parse(localStorage.getItem("cart")) || [];
      (this.products = t.map((t) => new s(t.id, t.link, t.name, t.brand, t.price, t.rating, t.weight))),
        this.cartDom.showCartProduct();
    }
  }
  class c {
    constructor(t) {
      (this.cart = t),
        (this.cartContainerDom = document.querySelector(".js-cartProductContainer")),
        (this.cartSubTotalDom = document.querySelector(".js-cartSubTotal")),
        (this.cartTotalDom = document.querySelector(".js-cartTotal")),
        this.showCartProduct();
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
          .join(""),
        s = document.querySelector(".js-quantityProductToCart");
      (s.innerText = this.cart.products.length), (this.cartContainerDom.innerHTML = t);
    }
  }
  let a = new r(),
    e = new o();
});
