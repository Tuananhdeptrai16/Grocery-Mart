window.addEventListener("DOMContentLoaded", () => {
  const rangePriceInputs = document.querySelectorAll(".form__price-slider input");
  const priceInputs = document.querySelectorAll(".js__formPrice input");
  const range = document.querySelector(".form__progress");
  let priceGap = 1000;

  function updateRange() {
    const minPrice = parseInt(priceInputs[0].value);
    const maxPrice = parseInt(priceInputs[1].value);
    range.style.left = (minPrice / rangePriceInputs[0].max) * 100 + "%";
    range.style.right = 100 - (maxPrice / rangePriceInputs[1].max) * 100 + "%";
  }

  priceInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInputs[0].value);
      let maxPrice = parseInt(priceInputs[1].value);
      if (maxPrice - minPrice >= priceGap && maxPrice <= rangePriceInputs[1].max) {
        if (e.target.classList.contains("js-inputMin")) {
          rangePriceInputs[0].value = minPrice;
        } else {
          rangePriceInputs[1].value = maxPrice;
        }
        updateRange();
      }
    });
  });

  rangePriceInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangePriceInputs[0].value);
      let maxVal = parseInt(rangePriceInputs[1].value);
      if (maxVal - minVal < priceGap) {
        if (e.target.classList.contains("form__range-min")) {
          rangePriceInputs[0].value = maxVal - priceGap;
        } else {
          rangePriceInputs[1].value = minVal + priceGap;
        }
      } else {
        priceInputs[0].value = minVal;
        priceInputs[1].value = maxVal;
        updateRange();
      }
    });
  });

  updateRange();
});
