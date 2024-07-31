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

    //kết thúc xóa
    //hàm tăng giá trị

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
