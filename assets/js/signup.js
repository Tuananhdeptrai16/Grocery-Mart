window.addEventListener("DOMContentLoaded", () => {
  function toast({ title = "", message = "", type = "info", duration = 2000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");

      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);

      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };

      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle",
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);

      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

      toast.innerHTML = `
                          <div class="toast__icon">
                              <i class="${icon}"></i>
                          </div>
                          <div class="toast__body">
                              <h3 class="toast__title">${title}</h3>
                              <p class="toast__msg">${message}</p>
                          </div>
                          <div class="toast__close">
                              <i class="fas fa-times"></i>
                          </div>
                      `;
      main.appendChild(toast);
    }
  }
  const buttonNext = document.querySelector(".auth__intro-next");
  const content = document.querySelector(".auth__content");
  buttonNext.onclick = () => {
    content.classList.toggle("show_Singup");
  };

  const buttonSignUp = document.querySelector(".auth__btn--Signup");
  const textError = document.querySelector(".form__error--confirm");
  buttonSignUp.onclick = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    let email = document.querySelector(".auth__from__email").value;
    let passWord = document.querySelector(".auth__from__password").value;
    let confirm = document.querySelector(".auth__from__confirm").value;

    if (email === "" || passWord === "" || confirm === "") {
      textError.style.display = "block";
      textError.innerText = `Please fill in complete registration information`;
      toast({
        title: "Error!",
        message: "Please fill in complete registration information.",
        type: "error",
        duration: 3000,
      });
      return;
    } else if (passWord !== confirm) {
      textError.style.display = "block";
      textError.innerText = `password incorrect`;
      toast({
        title: "Error!",
        message: "Please fill in complete registration information.",
        type: "error",
        duration: 3000,
      });
      return;
    } else {
      localStorage.setItem("email", email);
      localStorage.setItem("pass", passWord);
      toast({
        title: "Success",
        message: "You have successfully registered for a Grocry Mart account. Automatically redirect...",
        type: "success",
        duration: 3000,
      });
      setTimeout(() => {
        window.location.href = "sign-in.html";
      }, 3000);
    }
  };
});
