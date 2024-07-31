import { toggleShow as t } from "./toggleShowOverlay.js";
window.addEventListener("DOMContentLoaded", () => {
  let e = document.querySelector(".buttonSubmit"),
    r = document.querySelector(".form__error--throw");
  e
    ? (e.onclick = (t) => {
        t.preventDefault();
        let e = document.querySelector(".form__name").value,
          a = document.querySelector(".form__phone").value,
          i = document.querySelector(".form__text--area-input").value,
          o = document.querySelector(".form__city").value;
        if ("" === e || "" === a || "" === i || "" === o) {
          (r.style.display = "block"), (r.innerText = "Please fill in complete registration add new address");
          return;
        }
        r.style.display = "none";
      })
    : console.log("Kh\xf4ng t\xecm thấy n\xfat gửi."),
    t(),
    fetch("./assets/json/product.json")
      .then((t) => t.json())
      .then((t) => {
        o.products = t.map((t) => new a(t.id, t.link, t.name, t.brand, t.price, t.rating, t.weight));
      })
      .catch((t) => console.error("Call Fail Api", t));
  class a {
    constructor(t, e, r, a, i, o, c) {
      (this.id = t),
        (this.link = e),
        (this.name = r),
        (this.brand = a),
        (this.price = i),
        (this.rating = o),
        (this.weight = c);
    }
    formatPrice() {
      let t = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
      return t.format(this.price);
    }
  }
  class i {
    cartItems = [];
    constructor() {
      (this.cartContainerDom = document.querySelector(".js-cartProductContainer")),
        (this.ProductContainerDom = document.querySelector(".js-showContainer")),
        this.loadCartFromLocalStorage();
    }
    loadCartFromLocalStorage() {
      let t = JSON.parse(localStorage.getItem("cart") || "[]"),
        e = this.removeDuplicateById(t);
      (this.cartItems = e.map((t) => new a(t.id, t.link, t.name, t.brand, t.price, t.rating, t.weight))),
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
    CartDisplayMessage() {
      t();
    }
    removeCart(t, e) {
      t.addEventListener("click", () => {
        this.removeProductFromCart(e), this.totalPrice(), this.showPriceToCartFromLocalStorage();
      });
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
    }
    updateLocalStorage() {
      let t = this.cartItems.map((t) => {
        let { domInstance: e, ...r } = t;
        return r;
      });
      localStorage.setItem("cart", JSON.stringify(t));
    }
    renderCart() {
      this.showCart();
    }
  }
  let o = new i();
});
