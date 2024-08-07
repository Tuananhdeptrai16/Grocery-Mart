import { toggleShow } from "./toggleShowOverlay.js";
window.addEventListener("DOMContentLoaded", () => {
  const buttonSubmit = document.querySelector(".buttonSubmit");
  const textError = document.querySelector(".form__error--throw");
  if (buttonSubmit) {
    buttonSubmit.onclick = (event) => {
      event.preventDefault();
      let name = document.querySelector(".form__name").value;
      let phone = document.querySelector(".form__phone").value;
      let address = document.querySelector(".form__text--area-input").value;
      let city = document.querySelector(".form__city").value; // Lấy giá trị của trường city
      if (name === "" || phone === "" || address === "" || city === "") {
        textError.style.display = "block";
        textError.innerText = `Please fill in complete registration add new address`;
        return;
      } else {
        textError.style.display = "none"; // Ẩn thông báo lỗi nếu form hợp lệ
      }

      // Logic gửi form ở đây (ví dụ: gửi dữ liệu đến server)
    };
  } else {
    console.log("Không tìm thấy nút gửi.");
  }
  toggleShow();

  fetch("./assets/json/product.json")
    .then((response) => response.json())
    .then((data) => {
      cartDom.products = data.map((product) => {
        return new Cart(
          product.id,
          product.link,
          product.name,
          product.brand,
          product.price,
          product.rating,
          product.weight
        );
      });
    })
    .catch((error) => console.error("Call Fail Api", error));
  class Cart {
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
  class CartDom {
    cartItems = [];
    constructor() {
      this.cartContainerDom = document.querySelector(".js-cartProductContainer");
      this.ProductContainerDom = document.querySelector(".js-showContainer");
      this.loadCartFromLocalStorage();
    }
    loadCartFromLocalStorage() {
      const saveCartItem = JSON.parse(localStorage.getItem("cart") || "[]");
      const uniqueCartItems = this.removeDuplicateById(saveCartItem);
      this.cartItems = uniqueCartItems.map((cartItem) => {
        return new Cart(
          cartItem.id,
          cartItem.link,
          cartItem.name,
          cartItem.brand,
          cartItem.price,
          cartItem.rating,
          cartItem.weight
        );
      });
      this.showProduct();
      this.showCart();
      this.totalPrice();
    }
    removeDuplicateById(saveCartItem) {
      const uniqueItems = [];
      const ids = new Set();
      for (const item of saveCartItem) {
        if (!ids.has(item.id)) {
          uniqueItems.push(item);
          ids.add(item.id);
        }
      }
      return uniqueItems;
    }
    showCart() {
      const productHTML = this.cartItems.map((cart) => {
        return `<div class="col">
                  <article class="cart-preview-item">
                    <div class="cart-preview-item__img-wrap">
                      <img src="${cart.link}" alt="" class="cart-preview-item__thumb">
                    </div>
                    <h3 class="cart-preview-item__title">${cart.name}</h3>
                    <p class="cart-preview-item__price">${cart.formatPrice()}</p>
                  </article>
                </div>`;
      });
      this.cartContainerDom.innerHTML = productHTML;
      this.showPriceToCartFromLocalStorage();
    }
    showPriceToCartFromLocalStorage() {
      const getSubtotal = localStorage.getItem("subtotal");
      const getTotal = localStorage.getItem("totalprice");
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      const subTotal = document.querySelector(".js-subTotal");
      const totalPrice = document.querySelector(".js-total");
      subTotal.innerText = `${formatter.format(getSubtotal)}`;
      totalPrice.innerText = `${formatter.format(getTotal)}`;
    }
    showProduct() {
      const productHTML = this.cartItems
        .map((cartItem) => {
          return `<article class="cart-item js-productItemWrap" data-id="${cartItem.id}"}>
                      <a href="./Product-detail.html">
                        <img src="${cartItem.link}" alt="item" class="cart-item__thumb" />
                      </a>
                      <div class="cart-item__content">
                        <div class="cart-item__content--left js-quantityWrap">
                          <h3 class="cart-item__title">
                            <a href="./Product-detail.html">${cartItem.name}</a>
                          </h3>
                          <p class="cart-item__price-wrap">${cartItem.formatPrice()} | <span class="cart-item__status">In Stock</span></p>
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
                          <p class="cart-item__total-price js-subPriceItem"  data-id="${
                            cartItem.id
                          }">${cartItem.formatPrice()}</p>
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
                    </article>`;
        })
        .join("");

      this.ProductContainerDom.innerHTML = productHTML;
      const quantityIncreaseButtonDoms = this.ProductContainerDom.querySelectorAll(".js-quantityIncreaseButton");
      const quantityDecreaseButtonDoms = this.ProductContainerDom.querySelectorAll(".js-quantityDecreaseButton");
      quantityIncreaseButtonDoms.forEach((quantityIncreaseButtonDom) => {
        this.increaseQuantityButton(quantityIncreaseButtonDom);
        this.totalPrice;
      });
      quantityDecreaseButtonDoms.forEach((quantityDecreaseButtonDom) => {
        this.decreaseQuantityButton(quantityDecreaseButtonDom);
      });
      this.CartDisplayMessage();
      const RemoveCartButton = document.querySelector(".js-removeProductFromCart");
      const DeleteButtons = this.ProductContainerDom.querySelectorAll(".js-DeleteButton");
      DeleteButtons.forEach((DeleteButton) => {
        DeleteButton.addEventListener("click", () => {
          this.removeCart(RemoveCartButton, DeleteButton);
        });
      });
    }
    CartDisplayMessage() {
      toggleShow();
    }
    removeCart(RemoveCartButton, DeleteButton) {
      RemoveCartButton.addEventListener("click", () => {
        this.removeProductFromCart(DeleteButton);
        this.totalPrice();
        this.showPriceToCartFromLocalStorage();
      });
    }
    removeProductFromCart(DeleteButton) {
      const DivItem = DeleteButton.closest(".js-productItemWrap");
      const ItemIndex = DivItem.dataset.id;
      const productCartIndex = this.cartItems.findIndex((cartItem) => cartItem.id === parseInt(ItemIndex));
      if (productCartIndex !== -1) {
        this.cartItems.splice(productCartIndex, 1);
      }
      this.renderCart();
      this.updateLocalStorage();
    }
    //kết thúc xóa
    //hàm tăng giá trị
    increaseQuantityButton(quantityIncreaseButtonDom) {
      quantityIncreaseButtonDom.addEventListener("click", () => {
        const productDiv = quantityIncreaseButtonDom.closest(".js-quantityWrap");
        const currenQuantity = this.getCurrentQuantity(productDiv, quantityIncreaseButtonDom);
        this.setQuantity(productDiv, currenQuantity + 1);
        this.subTotalPrice(productDiv);
        this.totalPrice();
      });
    }
    totalQuantity(productDiv) {
      const quantity = this.getCurrentQuantity(productDiv);
      return quantity;
    }
    totalPrice() {
      const total = this.cartItems.reduce((acc, product) => {
        const price = parseFloat(product.price);
        let quantity = parseInt(product.quantity, 10);

        if (isNaN(quantity)) {
          quantity = 1;
        }
        return acc + price * quantity;
      }, 0);
      const PriceShipping = 1000;
      this.PriceShow(total, total + PriceShipping);
      return total;
    }
    PriceShow(subtotal, totalprice) {
      const subTotal1 = document.querySelector(".js-Subtotal1");
      const totalPrice1 = document.querySelector(".js-totalPrice1");
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      subTotal1.textContent = `${formatter.format(subtotal)}`;
      totalPrice1.textContent = `${formatter.format(totalprice)}`;
      const subTotal2 = document.querySelector(".js-Subtotal2");
      const totalPrice2 = document.querySelector(".js-totalPrice2");
      subTotal2.textContent = `${formatter.format(subtotal)}`;
      totalPrice2.textContent = `${formatter.format(totalprice)}`;
      const sumItem = document.querySelector(".js-lengthItem");
      sumItem.textContent = `${this.cartItems.length}`;
      this.savePriceToLocalStorage(subtotal, totalprice);
    }
    savePriceToLocalStorage(subtotal, totalprice) {
      localStorage.setItem("subtotal", subtotal);
      localStorage.setItem("totalprice", totalprice);
    }
    subTotalPrice(productDiv) {
      const cartItemContent = productDiv.parentElement;
      const PriceItem = cartItemContent.querySelector(".js-subPriceItem");
      const a = this.cartItems.find((p) => p.id === parseInt(PriceItem.dataset.id));
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      PriceItem.innerHTML = `${formatter.format(a.price * a.quantity)}`;
    }
    getCurrentQuantity(productDiv) {
      return parseInt(productDiv.querySelector(".js-quantityInput").textContent);
    }
    setQuantity(productDiv, quantity) {
      const productId = parseInt(productDiv.closest(".js-productItemWrap").dataset.id, 10);
      const cartItem = this.cartItems.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
      productDiv.querySelector(".js-quantityInput").textContent = quantity;
    }

    decreaseQuantityButton(quantityDecreaseButtonDom) {
      quantityDecreaseButtonDom.addEventListener("click", () => {
        const productDiv = quantityDecreaseButtonDom.closest(".js-quantityWrap");
        const currenQuantity = this.getCurrentQuantity(productDiv, quantityDecreaseButtonDom);
        if (currenQuantity <= 1) {
          this.setQuantity(productDiv, 1);
          this.subTotalPrice(productDiv);
          this.totalPrice(); // Cập nhật tổng giá sau khi thay đổi số lượng
        } else {
          this.setQuantity(productDiv, currenQuantity - 1);
          this.subTotalPrice(productDiv);
          this.totalPrice(); // Cập nhật tổng giá sau khi thay đổi số lượng
        }
      });
    }
    //kết thúc tăng
    //hàm update lại
    updateLocalStorage() {
      // Chuyển đổi sản phẩm thành dạng không có thuộc tính không cần thiết
      const productsToSave = this.cartItems.map((product) => {
        // Tạo đối tượng mới không có thuộc tính domInstance
        const { domInstance, ...productData } = product;
        return productData;
      });
      localStorage.setItem("cart", JSON.stringify(productsToSave));
    }
    //hàm render lại sản phẩm
    renderCart() {
      this.showProduct();
      this.showCart();
    }
  }
  const cartDom = new CartDom();
});
