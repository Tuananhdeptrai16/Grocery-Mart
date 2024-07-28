window.addEventListener("DOMContentLoaded", () => {
  const buttonSubmit = document.querySelector(".buttonSubmit");
  const textError = document.querySelector(".form__error--throw");
  if (buttonSubmit) {
    buttonSubmit.onclick = (event) => {
      event.preventDefault(); // Ngăn chặn hành động mặc định của nút

      let name = document.querySelector(".form__name").value;
      let phone = document.querySelector(".form__phone").value;
      let address = document.querySelector(".form__text--area-input").value;
      let city = document.querySelector(".form__city").value; // Lấy giá trị của trường city
      console.log(name, phone, address, city);
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
});
