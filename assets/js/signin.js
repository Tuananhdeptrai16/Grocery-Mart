window.addEventListener("DOMContentLoaded", () => {
  const buttonSignIn = document.querySelector(".auth__btn--Signin");
  const textError = document.querySelector(".form__error--confirm");
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
  buttonSignIn.onclick = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    let email = document.querySelector(".auth__from__email--signIn").value;
    let passWord = document.querySelector(".auth__from__password--signIn").value;
    let emailLocal = localStorage.getItem("email");
    let passLocal = localStorage.getItem("pass");
    if (email === "" || passWord === "") {
      textError.style.display = "block";
      textError.innerText = `Please fill in all login information`;
      toast({
        title: "Error!",
        message: "Please fill in complete registration information.",
        type: "error",
        duration: 3000,
      });
      return;
    } else if (email === emailLocal && passWord === passLocal) {
      toast({
        title: "Success",
        message: "Successful login !! Automatically redirect...",
        type: "success",
        duration: 3000,
      });
      setTimeout(() => {
        window.location.href = "index-logined.html";
      }, 3000);
    } else if (email !== "" || passWord !== "") {
      textError.style.display = "block";
      textError.innerText = `User or password is incorrect!!`;
      toast({
        title: "Error!",
        message: "Please fill in complete registration information.",
        type: "error",
        duration: 3000,
      });
      return;
    }
  };
});
