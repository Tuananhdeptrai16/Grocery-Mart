window.addEventListener("DOMContentLoaded", () => {
  const slideShows = document.querySelectorAll(".slideshow__item");
  const slideShowLength = slideShows.length;
  let width = slideShows[0].offsetWidth;
  let i = 0;
  const numberSlideShow = document.querySelector(".slideshow__num");
  console.log(numberSlideShow);

  const updateWidth = () => {
    width = slideShows[0].offsetWidth;
    slideShows.forEach((item) => {
      item.style.transform = `translateX(${-width * i}px)`;
      numberSlideShow.innerText = `${i + 1}`;
    });
  };

  window.addEventListener("resize", updateWidth);

  setInterval(() => {
    i++;
    if (i === slideShowLength) {
      i = 0;
    }
    slideShows.forEach((item) => {
      item.style.transform = `translateX(${-width * i}px)`;
      numberSlideShow.innerText = `${i + 1}`;
    });
  }, 5000);

  const btnRight = document.querySelector(".slideshow__btn--right");
  const btnLeft = document.querySelector(".slideshow__btn--left");
  btnRight.onclick = () => {
    i++;
    if (i === slideShowLength) {
      i = 0;
    }
    slideShows.forEach((item) => {
      item.style.transform = `translateX(${-width * i}px)`;
      numberSlideShow.innerText = `${i + 1}`;
    });
  };
  btnLeft.onclick = () => {
    i--;
    if (i < 0) {
      i = 0;
    }
    slideShows.forEach((item) => {
      item.style.transform = `translateX(${-width * i}px)`;
      numberSlideShow.innerText = `${i + 1}`;
    });
  };
});
