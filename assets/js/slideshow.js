const slideItems = [
  {
    img: "./assets/img/slideshow/slideshow.jpg",
  },
  {
    img: "./assets/img/slideshow/slideshow2.jpg",
  },
  {
    img: "./assets/img/slideshow/slideshow3.jpg",
  },
  {
    img: "./assets/img/slideshow/slideshow4.jpg",
  },
  {
    img: "./assets/img/slideshow/slideshow5.jpg",
  },
  {
    img: "./assets/img/slideshow/slideshow6.jpg",
  },
  {
    img: "./assets/img/slideshow/slideshow7.jpg",
  },
];
class Slide {
  constructor(img) {
    this.img = img;
  }
}
const slides = slideItems.map((slide) => {
  return new Slide(slide.img);
});
class Slider {
  constructor(slides) {
    this.slides = slides;
    this.slideItemContainer = document.querySelector(".js-sliderItemContainer");
    this.currentIndex = 0; // Biến đếm để theo dõi chỉ số hình ảnh hiện tại
  }
  init() {
    const slideItemHTML = this.slides
      .map((slide, index) => {
        let positon = "next";
        if (index === 0) {
          positon = "active";
        }
        if (index === this.slides.length - 1) {
          positon = "last";
        }
        if (this.slides.length <= 1) {
          positon = "active";
        }
        return `<a href="#" class="slideshow__item js-sliderItem ${positon}">
              <picture>
                <source media="(max-width:767.98px)" srcset="./assets/img/slideshow/slideshowmd.png" />
                <img class="slideshow__item__image" src="${slide.img}" alt="Shopping" />
              </picture>
            </a>
            `;
      })
      .join("");
    this.slideItemContainer.innerHTML = slideItemHTML;
    const buttonNext = document.querySelector(".js-btnNext");
    const buttonPrev = document.querySelector(".js-btnPrev");
    this.updateSlideIndex();
    buttonNext.addEventListener("click", () => this.changeSlide());
    buttonPrev.addEventListener("click", () => this.changeSlide("prev"));
    setInterval(() => {
      this.changeSlide();
    }, 3000);
  }
  updateSlideIndex() {
    const slideIndexElement = document.querySelector(".js-slideIndex");
    if (slideIndexElement) {
      slideIndexElement.textContent = `${this.currentIndex + 1}`;
    }
    const lengthSlideElement = document.querySelector(".js-slideIndexMax");
    if (lengthSlideElement) {
      lengthSlideElement.textContent = `${this.slides.length}`;
    }
  }

  changeSlide(type) {
    let i = this.slides.length;
    console.log(i);
    const active = document.querySelector(".active");
    const last = document.querySelector(".last");
    let next = active.nextElementSibling;
    if (!next) {
      next = this.slideItemContainer.firstElementChild;
    }
    active.classList.remove("active");
    last.classList.remove("last");
    next.classList.remove("next");
    if (type === "prev") {
      active.classList.add("next");
      last.classList.add("active");
      let next = last.previousElementSibling;
      if (!next) {
        next = this.slideItemContainer.lastElementChild;
      }
      next.classList.remove("next");
      next.classList.add("last");
      this.currentIndex = (this.currentIndex - 1) % this.slides.length;
      return;
    }
    active.classList.add("last");
    last.classList.add("next");
    next.classList.add("active");
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlideIndex();
  }
}
const slider = new Slider(slides);
console.log(slider.init());
