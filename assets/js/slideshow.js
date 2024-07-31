const slideItems = [
  { img: "./assets/img/slideshow/slideshow.jpg" },
  { img: "./assets/img/slideshow/slideshow2.jpg" },
  { img: "./assets/img/slideshow/slideshow3.jpg" },
  { img: "./assets/img/slideshow/slideshow4.jpg" },
  { img: "./assets/img/slideshow/slideshow5.jpg" },
  { img: "./assets/img/slideshow/slideshow6.jpg" },
  { img: "./assets/img/slideshow/slideshow7.jpg" },
];
class Slide {
  constructor(e) {
    this.img = e;
  }
}
const slides = slideItems.map((e) => new Slide(e.img));
class Slider {
  constructor(e) {
    (this.slides = e),
      (this.slideItemContainer = document.querySelector(".js-sliderItemContainer")),
      (this.currentIndex = 0);
  }
  init() {
    let e = this.slides
      .map((e, s) => {
        let i = "next";
        return (
          0 === s && (i = "active"),
          s === this.slides.length - 1 && (i = "last"),
          this.slides.length <= 1 && (i = "active"),
          `<a href="#" class="slideshow__item js-sliderItem ${i}">
              <picture>
                <source media="(max-width:767.98px)" srcset="./assets/img/slideshow/slideshowmd.png" />
                <img class="slideshow__item__image" src="${e.img}" alt="Shopping" />
              </picture>
            </a>
            `
        );
      })
      .join("");
    this.slideItemContainer.innerHTML = e;
    let s = document.querySelector(".js-btnNext"),
      i = document.querySelector(".js-btnPrev");
    this.updateSlideIndex(),
      s.addEventListener("click", () => this.changeSlide()),
      i.addEventListener("click", () => this.changeSlide("prev")),
      setInterval(() => {
        this.changeSlide();
      }, 3e3);
  }
  updateSlideIndex() {
    let e = document.querySelector(".js-slideIndex");
    e && (e.textContent = `${this.currentIndex + 1}`);
    let s = document.querySelector(".js-slideIndexMax");
    s && (s.textContent = `${this.slides.length}`);
  }
  changeSlide(e) {
    let s = document.querySelector(".active"),
      i = document.querySelector(".last"),
      t = s.nextElementSibling;
    if (
      (t || (t = this.slideItemContainer.firstElementChild),
      s.classList.remove("active"),
      i.classList.remove("last"),
      t.classList.remove("next"),
      "prev" === e)
    ) {
      s.classList.add("next"), i.classList.add("active");
      let l = i.previousElementSibling;
      l || (l = this.slideItemContainer.lastElementChild),
        l.classList.remove("next"),
        l.classList.add("last"),
        (this.currentIndex = (this.currentIndex - 1) % this.slides.length);
      return;
    }
    s.classList.add("last"),
      i.classList.add("next"),
      t.classList.add("active"),
      (this.currentIndex = (this.currentIndex + 1) % this.slides.length),
      this.updateSlideIndex();
  }
}
const slider = new Slider(slides);
