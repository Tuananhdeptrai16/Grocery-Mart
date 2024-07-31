import { toggleShow as t } from "./toggleShowOverlay.js";
window.addEventListener("DOMContentLoaded", () => {
  fetch("./assets/json/product.json")
    .then((t) => t.json())
    .then((t) => {
      a.products = t.map((t) => new e(t.id, t.link, t.name, t.brand, t.price, t.rating, t.weight));
    })
    .catch((t) => console.error("Call Fail Api", t));
  class e {
    constructor(t, e, r, a, i, s, c) {
      (this.id = t),
        (this.link = e),
        (this.name = r),
        (this.brand = a),
        (this.price = i),
        (this.rating = s),
        (this.weight = c);
    }
    formatPrice() {
      let t = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
      return t.format(this.price);
    }
  }
  class r {
    cartItems = [];
    constructor() {
      (this.cartContainerDom = document.querySelector(".js-cartProductContainer")),
        (this.ProductContainerDom = document.querySelector(".js-showContainer")),
        this.loadCartFromLocalStorage();
    }
    loadCartFromLocalStorage() {
      let t = JSON.parse(localStorage.getItem("cart") || "[]"),
        r = this.removeDuplicateById(t);
      (this.cartItems = r.map((t) => new e(t.id, t.link, t.name, t.brand, t.price, t.rating, t.weight))),
        this.showProduct(),
        this.showCart(),
        this.totalPrice();
    }
    removeDuplicateById(t) {
      let e = [],
        r = new Set();
      for (let a of t) r.has(a.id) || (e.push(a), r.add(a.id));
      return e;
    }
    showCart() {
      let t = this.cartItems.map(
        (t) => `<div class="col">
  <article class="cart-preview-item">
    <div class="cart-preview-item__img-wrap">
      <img src="${t.link}" alt="" class="cart-preview-item__thumb">
    </div>
    <h3 class="cart-preview-item__title">${t.name}</h3>
    <p class="cart-preview-item__price">${t.formatPrice()}</p>
  </article>
</div>`
      );
      (this.cartContainerDom.innerHTML = t), this.showPriceToCartFromLocalStorage();
    }
    showPriceToCartFromLocalStorage() {
      let t = localStorage.getItem("subtotal"),
        e = localStorage.getItem("totalprice"),
        r = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }),
        a = document.querySelector(".js-subTotal"),
        i = document.querySelector(".js-total");
      (a.innerText = `${r.format(t)}`), (i.innerText = `${r.format(e)}`);
    }
    showProduct() {
      let t = this.cartItems
        .map(
          (t) => `<article class="cart-item js-productItemWrap" data-id="${t.id}"}>
      <a href="./Product-detail.html">
        <img src="${t.link}" alt="item" class="cart-item__thumb" />
      </a>
      <div class="cart-item__content">
        <div class="cart-item__content--left js-quantityWrap">
          <h3 class="cart-item__title">
            <a href="./Product-detail.html">${t.name}</a>
          </h3>
          <p class="cart-item__price-wrap">${t.formatPrice()} | <span class="cart-item__status">In Stock</span></p>
          <div class="cart-item__ctrl cart-item__ctrl--md-block">
            <div class="cart-item__input">
              LavAzza
              <img src="./assets/icons/arrow-down2.svg" alt="down2" class="icon" />
            </div>

            <div class="cart-item__input">
              <button class="cart-item__input--btn js-quantityDecreaseButton">
                <img src="./assets/icons/minus.svg" alt="minus" class="icon" />
              </button>
              <span class="js-quantityInput">1</span>
              <button class="cart-item__input--btn js-quantityIncreaseButton">
                <img src="./assets/icons/plus.svg" alt="plus" class="icon" />
              </button>
            </div>
          </div>
        </div>
        <div class="cart-item__content--right">
          <p class="cart-item__total-price js-subPriceItem"  data-id="${t.id}">${t.formatPrice()}</p>
          <div class="cart-item__ctrl">
            <button class="cart-item__ctrl--btn">
              <img src="./assets/icons/heart2.svg" alt="" />
              Save
            </button>
            <button toggle-class="#modal-delete" class="js-toggle cart-item__ctrl--btn delete js-DeleteButton ">
              <img src="./assets/icons/trash.svg" alt="" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>`
        )
        .join("");
      this.ProductContainerDom.innerHTML = t;
      let e = this.ProductContainerDom.querySelectorAll(".js-quantityIncreaseButton"),
        r = this.ProductContainerDom.querySelectorAll(".js-quantityDecreaseButton");
      e.forEach((t) => {
        this.increaseQuantityButton(t), this.totalPrice;
      }),
        r.forEach((t) => {
          this.decreaseQuantityButton(t);
        }),
        this.CartDisplayMessage();
      let a = document.querySelector(".js-removeProductFromCart"),
        i = this.ProductContainerDom.querySelectorAll(".js-DeleteButton");
      i.forEach((t) => {
        t.addEventListener("click", () => {
          this.removeCart(a, t);
        });
      });
    }
    CartDisplayMessage() {
      t();
    }
    removeCart(t, e) {
      t.addEventListener("click", () => {
        this.removeProductFromCart(e), this.totalPrice(), this.showPriceToCartFromLocalStorage();
      });
    }
    removeProductFromCart(t) {
      let e = t.closest(".js-productItemWrap"),
        r = e.dataset.id;
      console.log(r);
      let a = this.cartItems.findIndex((t) => t.id === parseInt(r));
      -1 !== a && this.cartItems.splice(a, 1), this.renderCart(), this.updateLocalStorage();
    }
    increaseQuantityButton(t) {
      t.addEventListener("click", () => {
        let e = t.closest(".js-quantityWrap"),
          r = this.getCurrentQuantity(e, t);
        this.setQuantity(e, r + 1), this.subTotalPrice(e), this.totalPrice(), console.log(this.cartItems.length);
      });
    }
    totalQuantity(t) {
      let e = this.getCurrentQuantity(t);
      return e;
    }
    totalPrice() {
      let t = this.cartItems.reduce((t, e) => {
        let r = parseFloat(e.price),
          a = parseInt(e.quantity, 10);
        return isNaN(a) && (a = 1), t + r * a;
      }, 0);
      return this.PriceShow(t, t + 1e3), t;
    }
    PriceShow(t, e) {
      let r = document.querySelector(".js-Subtotal1"),
        a = document.querySelector(".js-totalPrice1"),
        i = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
      (r.textContent = `${i.format(t)}`), (a.textContent = `${i.format(e)}`);
      let s = document.querySelector(".js-Subtotal2"),
        c = document.querySelector(".js-totalPrice2");
      (s.textContent = `${i.format(t)}`), (c.textContent = `${i.format(e)}`);
      let o = document.querySelector(".js-lengthItem");
      (o.textContent = `${this.cartItems.length}`), this.savePriceToLocalStorage(t, e);
    }
    savePriceToLocalStorage(t, e) {
      localStorage.setItem("subtotal", t), localStorage.setItem("totalprice", e);
    }
    subTotalPrice(t) {
      let e = t.parentElement,
        r = e.querySelector(".js-subPriceItem"),
        a = this.cartItems.find((t) => t.id === parseInt(r.dataset.id)),
        i = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
      r.innerHTML = `${i.format(a.price * a.quantity)}`;
    }
    getCurrentQuantity(t) {
      return parseInt(t.querySelector(".js-quantityInput").textContent);
    }
    setQuantity(t, e) {
      let r = parseInt(t.closest(".js-productItemWrap").dataset.id, 10),
        a = this.cartItems.find((t) => t.id === r);
      a && (a.quantity = e), (t.querySelector(".js-quantityInput").textContent = e);
    }
    decreaseQuantityButton(t) {
      t.addEventListener("click", () => {
        let e = t.closest(".js-quantityWrap"),
          r = this.getCurrentQuantity(e, t);
        r <= 1
          ? (this.setQuantity(e, 1), this.subTotalPrice(e), this.totalPrice())
          : (this.setQuantity(e, r - 1), this.subTotalPrice(e), this.totalPrice());
      });
    }
    updateLocalStorage() {
      let t = this.cartItems.map((t) => {
        let { domInstance: e, ...r } = t;
        return r;
      });
      localStorage.setItem("cart", JSON.stringify(t));
    }
    renderCart() {
      this.showProduct(), this.showCart();
    }
  }
  let a = new r();
});
