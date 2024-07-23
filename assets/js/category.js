function fetchCategory() {
  fetch("./assets/json/category.json")
    .then((response) => response.json())
    .then((datas) => displayCategory(datas))
    .catch((error) => console.log("error", error));
}
function displayCategory(datas) {
  const homeCategory = document.querySelector(".home__cate");
  datas.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("col");
    categoryDiv.innerHTML = `<a href="#!">
              <article class="cate-item">
                <img src="${category.imageUrl}" alt="item1" class="cate-item__thumb">
                <div class="cate-item__infor">
                  <h3 class="cate-item__title">${category.category}</h3>
                  <p class="cate-item__desc line-clamp">${category.description}</p>
                </div>
              </article>
            </a>`;
    homeCategory.appendChild(categoryDiv);
  });
}
fetchCategory();
