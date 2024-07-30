import { filterSlide } from "./filterSlide.js";
import { toggleShow } from "./toggleShowOverlay.js";
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
      productsDom.changeFilterProduct();
      productsDom.SaveChangeIdProduct();
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
          }' data-id='${product.id}'>
             
              <div class="product-card__img-wrap js-saveChangeIdProduct">
              
                <div>
                  <img src="${product.link}" alt="${product.name}" class="product-card__thumb js-productThumbs">
                </div>
                <button class="like-btn product-card__like--btn js-HeartClick">
                  <img src="./assets/icons/heart.svg" alt="heart" class="like-btn__icons icon ">
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
      const ClickHearts = this.productContainerDom.querySelectorAll(".js-HeartClick");
      ClickHearts.forEach((clickHeart) => {
        clickHeart.addEventListener("click", () => {
          const productDom = clickHeart.closest(".js-productItem");
          const product = this.products.find((product) => +product.id === +productDom.dataset.id);
          product.dom = new ProductsDomFavourit(product, productDom, clickHeart);
          product.dom.addEventClick();
        });
      });
      this.showFilter();
    }
    showFilter() {
      toggleShow();
      this.filterSlide();
    }
    filterSlide() {
      filterSlide();
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
            productDoms.forEach((product) => {
              const filterSelected = input.value.toLowerCase();
              const productBrand = product.dataset.category.toLowerCase();
              const productWeight = product.dataset.weight;
              console.log(productWeight === weight);
              if (productBrand.includes(filterSelected) && productWeight === weight) {
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

    SaveChangeIdProduct() {
      const productThumbItems = this.productContainerDom.querySelectorAll(".js-productThumbs");
      productThumbItems.forEach((productThumbItem) => {
        productThumbItem.addEventListener("click", () => {
          const productDom = productThumbItem.closest(".js-productItem");
          const productItemId = productDom.dataset.id;
          localStorage.setItem("productItemId", productItemId);
          window.location.href = "Product-detail-logined.html";
        });
      });
    }
  }
  class ProductsDomFavourit {
    constructor(product, productDom, buttonDom) {
      this.product = product;
      this.productDom = productDom;
      this.buttonDom = buttonDom;
    }
    addEventClick() {
      this.buttonDom.addEventListener("click", () => {
        this.addToCartFavourit();
        this.tranformHeartToHeartRed();
      });
    }
    tranformHeartToHeartRed() {
      this.buttonDom.outerHTML = ` 
       <button class="like-btn product-card__like--btn js-HeartClick">
                   <img src="./assets/icons/heart-red.svg" alt="heart" class="like-btn__icon-liked">
                </button>`;
    }
    addToCartFavourit() {
      cartFavourit.addProducts(this.product);
    }
  }
  class CartFavourit {
    productsFavourit = [];
    constructor() {
      this.cartFavouritDom = new CartFavouritDom(this);
    }
    addProducts(product) {
      this.productsFavourit.push(product);
      this.cartFavouritDom.showCartProductFavourit();
    }
  }
  class CartFavouritDom {
    constructor(cartFavourit) {
      this.cartFavourit = cartFavourit;
      this.cartFavouritContainerDom = document.querySelector(".js-cartFavouritContainer");
      this.showCartProductFavourit();
    }
    showCartProductFavourit() {
      this.cartFavouritContainerDom.innerHTML = this.cartFavourit.productsFavourit
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
      const numberQuantityFavouritItem = document.querySelector(".js-quantityFavouritItem");
      const formatNumber = (number) => (number <= 10 ? `0${number}` : `${number}`);
      numberQuantityFavouritItem.innerText = formatNumber(this.cartFavourit.productsFavourit.length);
    }
  }
  class Cart {
    products = [];
    constructor() {
      this.cartDom = new CartDom(this);
      this.loadCartFromLocalStorage();
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

    totalPrice() {
      const price = this.products.reduce((total, product) => {
        return total * product.price;
      }, 0);
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      return formatter.format(price);
    }
  }
  class CartDom {
    constructor(cart) {
      this.cart = cart;
      this.cartContainerDom = document.querySelector(".js-cartProductContainer");
      this.cartSubTotalDom = document.querySelector(".js-cartSubTotal");
      this.cartTotalDom = document.querySelector(".js-cartTotal");
      this.renderCart();
    }
    renderCart() {
      console.log("object", this.cart.totalPrice());
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
      this.cartContainerDom.innerHTML = cartDisplayDom;
      const textQuantityProductToCart = document.querySelector(".js-quantityProductToCart");
      textQuantityProductToCart.innerText = this.cart.products.length;
    }
  }
  const productsDom = new ProductsDOM();
  const cartFavourit = new CartFavourit();
  const cart = new Cart();
});
