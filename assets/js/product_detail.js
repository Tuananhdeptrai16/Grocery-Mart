window.addEventListener("DOMContentLoaded", () => {
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

  class ProductsDOM {
    products = [];
    constructor() {
      this.ProductContainerDom = document.querySelector(".js-productWrap");
    }
    showProduct() {
      const selectedProduct = localStorage.getItem("productItemId");
      const productDom = this.products.find((product) => +product.id === +selectedProduct);
      const productHTML = `
                <div class="col-5 col-xl-6 col-lg-12">
                  <div class="product-preview">
                    <div class="product-preview__list">
                      <div class="product-preview__item">
                        <img src="${productDom.link}" alt="" class="product-preview__img">
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
                    <h1 class="product-info__heading">${productDom.name}</h1>
                    <div class="row">
                      <div class="col-5 col-xxl-6 col-xl-12">
                        <div class="prod-prop">
                          <img src="./assets/icons/star.svg" alt="star" class="prod-prop__icon">
                          <h4 class="prod-prop__title">(${productDom.rating}) 1100 reviews</h4>
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
                            <span class="prod-infor__price">${productDom.formatPrice()}</span>
                            <span class="prod-infor__tax">10%</span>
                          </div>
                          <span class="prod-infor__total--price">${productDom.formatPrice()}</span>
                          <div class="prod-infor__row prod-infor__btn-wrap">
                            <button class="btn btn--primary prod-infor__btn js-productItemButton">Add to cart</button>
                            <button class="like-btn prod-infor__like--btn">
                              <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon">
                              <img src="./assets/icons/heart-red.svg" alt="heart" class="like-btn__icon-liked">
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
             `;
      this.ProductContainerDom.innerHTML = productHTML;
      const buttonAddtoCart = this.ProductContainerDom.querySelector(".js-productItemButton");
      const product = this.products.find((product) => +product.id === +selectedProduct);
      product.domInstance = new ProductDom(product, buttonAddtoCart); // Đổi tên thành ProductDom
      product.domInstance.addEventClick(); // Sử dụng domInstance
    }
  }

  class ProductDom {
    constructor(product, buttonDom) {
      this.product = product;
      this.buttonDom = buttonDom;
    }
    addEventClick() {
      this.buttonDom.addEventListener("click", () => {
        this.addToCart();
      });
    }
    addToCart() {
      cart.addProduct(this.product);
    }
  }

  class Cart {
    products = [];
    constructor() {
      this.cartDom = new CartDom(this);
      this.loadCartFromLocalStorage();
    }
    addProduct(product) {
      this.products.push(product);
      this.saveCartToLocalStorage();
      this.cartDom.showCartProduct();
    }
    saveCartToLocalStorage() {
      // Chuyển đổi sản phẩm thành dạng không có thuộc tính không cần thiết
      const productsToSave = this.products.map((product) => {
        // Tạo đối tượng mới không có thuộc tính domInstance
        const { domInstance, ...productData } = product;
        return productData;
      });

      localStorage.setItem("cart", JSON.stringify(productsToSave));
    }

    loadCartFromLocalStorage() {
      const savedProducts = JSON.parse(localStorage.getItem("cart")) || [];
      this.products = savedProducts.map(
        (product) =>
          new Product(
            product.id,
            product.link,
            product.name,
            product.brand,
            product.price,
            product.rating,
            product.weight
          )
      );
      this.cartDom.showCartProduct();
    }
  }

  class CartDom {
    constructor(cart) {
      this.cart = cart;
      this.cartContainerDom = document.querySelector(".js-cartProductContainer");
      this.cartSubTotalDom = document.querySelector(".js-cartSubTotal");
      this.cartTotalDom = document.querySelector(".js-cartTotal");
      this.showCartProduct();
    }
    showCartProduct() {
      const cartDisplayDom = this.cart.products
        .map((product) => {
          return `<div class="col">
                        <article class="cart-preview-item">
                          <div class="cart-preview-item__img-wrap">
                            <img src="${product.link}" alt="" class="cart-preview-item__thumb" />
                          </div>
                          <h3 class="cart-preview-item__title line-clamp">${product.name}</h3>
                          <p class="cart-preview-item__price">${product.formatPrice()}</p>
                        </article>
                      </div>`;
        })
        .join("");
      const textQuantityProductToCart = document.querySelector(".js-quantityProductToCart");
      textQuantityProductToCart.innerText = this.cart.products.length;

      this.cartContainerDom.innerHTML = cartDisplayDom;
    }
  }

  const productsDom = new ProductsDOM();
  const cart = new Cart();
});
