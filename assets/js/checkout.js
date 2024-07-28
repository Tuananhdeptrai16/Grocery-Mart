import { toggleShow } from "./toggleShowOverlay.js";

window.addEventListener("DOMContentLoaded", () => {
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
      this.showCart();
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
      console.log(this.cartItems);
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
                          <p class="cart-item__total-price">${cartItem.formatPrice()}</p>
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
      this.totalItemPrice();
      //   this.totalPrice();
    }
    //hàm tính tổng tiền
    // totalPrice() {
    //   const arrPrices = [];
    //   this.cartItems.map((cartItem) => {
    //     const objCartItem ={
    //         price
    //     }
    //     arrPrices.push(cartItem.price);
    //   });
    //   const totalPrice = arrPrices.reduce((total, price) => {
    //     return total + price;
    //   }, 0);

    //   console.log(totalPrice);
    // }
    // totalQuantity() {}
    //hàm xóa
    CartDisplayMessage() {
      toggleShow();
    }
    removeCart(RemoveCartButton, DeleteButton) {
      RemoveCartButton.addEventListener("click", () => {
        this.removeProductFromCart(DeleteButton);
      });
    }
    removeProductFromCart(DeleteButton) {
      const DivItem = DeleteButton.closest(".js-productItemWrap");
      const ItemIndex = DivItem.dataset.id;
      const productCartIndex = this.cartItems.findIndex((cartItem) => cartItem.id === parseInt(ItemIndex));
      if (productCartIndex !== -1) {
        this.cartItems.splice(productCartIndex, 1);
      }
      console.log(this.cartItems);
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
        this.totalItemPrice();
      });
    }
    // totalItemPrice() {
    //     const price =
    //   console.log("Run");
    // }
    // getPrice(){
    //     return
    // }
    getCurrentQuantity(productDiv) {
      return parseInt(productDiv.querySelector(".js-quantityInput").textContent);
    }
    setQuantity(productDiv, quantity) {
      productDiv.querySelector(".js-quantityInput").innerHTML = quantity;
    }
    decreaseQuantityButton(quantityDecreaseButtonDom) {
      quantityDecreaseButtonDom.addEventListener("click", () => {
        const productDiv = quantityDecreaseButtonDom.closest(".js-quantityWrap");
        const currenQuantity = this.getCurrentQuantity(productDiv, quantityDecreaseButtonDom);
        if (currenQuantity <= 1) {
          this.setQuantity(productDiv, 1);
        } else {
          this.setQuantity(productDiv, currenQuantity - 1);
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
      this.showCart();
    }
  }
  const cartDom = new CartDom();
});
