window.document.addEventListener("DOMContentLoaded", () => {
  const userHandle = $(".js__action-user");
  console.log(userHandle);
  const userAction = $(".user__action");
  const lightModeHandle = $(".user__lightmode");
  const textLightMode = $(".user__lightmode--text-active");
  const htmlElement = document.documentElement;

  console.log(userHandle);
  userHandle.onclick = () => {
    userAction.classList.toggle("show");
  };
  window.addEventListener("click", (event) => {
    if (!userAction.contains(event.target) && !userHandle.contains(event.target)) {
      userAction.classList.remove("show");
    }
  });
  lightModeHandle.onclick = () => {
    const modeCurrent = htmlElement.getAttribute("class");
    if (modeCurrent && modeCurrent === "dark") {
      htmlElement.setAttribute("class", "light");
      textLightMode.innerText = "Dark";
    }
    if (modeCurrent && modeCurrent === "light") {
      htmlElement.setAttribute("class", "dark");
      textLightMode.innerText = "Bright";
    }
  };
});
