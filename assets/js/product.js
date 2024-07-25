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
        return new Product(product.link, product.name, product.brand, product.price, product.rating, product.w);
      });
      productsDom.showProduct();
      productsDom.changeFilterProduct();
      CartDom.products = data.map((product) => {
        return new Product(product.link, product.name, product.brand, product.price, product.rating, product.w);
      });
    })
    .catch((error) => console.error("Call Fail Api", error));
  class Product {
    constructor(link, name, brand, price, rating, weight) {
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
          }'>
              <div class="product-card__img-wrap">
                <a href="./Product-detail-logined.html">
                  <img src="${product.link}" alt="${product.name}" class="product-card__thumb">
                </a>
                <button class="like-btn product-card__like--btn">
                  <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon">
                  <img src="./assets/icons/heart-red.svg" alt="heart" class="like-btn__icon-liked">
                </button>
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
            const filterSelected = input.value.toLowerCase();
            productDoms.forEach((product) => {
              const productBrand = product.dataset.category.toLowerCase();
              const productWeight = product.dataset.weight;
              if (productBrand.includes(filterSelected) || weight === productWeight) {
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

  class Cart {
    products = [
      {
        link: "./assets/img/product/item1.jpg",
        name: "Organic Honey from Natural Beekeepers in the Hills",
        brand: "Starbucks",
        price: 8022,
        rating: 1.3,
        weight: 500,
      },
      {
        link: "./assets/img/product/item2.jpg",
        name: "Organic Honey from Natural Beekeepers in the Hills",
        brand: "Starbucks",
        price: 8022,
        rating: 1.3,
        weight: 600,
      },
      {
        link: "./assets/img/product/item3.jpg",
        name: "Organic Honey from Natural Beekeepers in the Hills",
        brand: "Starbucks",
        price: 8022,
        rating: 1.3,
        weight: 800,
      },
      {
        link: "./assets/img/product/item4.jpg",
        name: "Organic Honey from Natural Beekeepers in the Hills",
        brand: "Starbucks",
        price: 8022,
        rating: 1.3,
        weight: 500,
      },
      {
        link: "./assets/img/product/item5.jpg",
        name: "Organic Honey from Natural Beekeepers in the Hills",
        brand: "Starbucks",
        price: 8022,
        rating: 1.3,
        weight: 600,
      },
      {
        link: "./assets/img/product/item6.jpg",
        name: "Organic Honey from Natural Beekeepers in the Hills",
        brand: "Starbucks",
        price: 8022,
        rating: 1.3,
        weight: 800,
      },
    ];
    constructor() {
      this.cartDom = new CartDom(this);
    }
    addProduct(product) {}
    removeProduct(product) {}
    updateQuantity() {}
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
                    <p class="cart-preview-item__price">${product.price}</p>
                  </article>
                </div>`;
        })
        .join("");
      this.cartContainerDom.innerHTML = cartDisplayDom;
    }
  }
  const productsDom = new ProductsDOM();
  const cart = new Cart();
  console.log(cart);
});
