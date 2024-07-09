window.addEventListener("DOMContentLoaded", () => {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const endDate = document.querySelector(".js-endDate");
  const countDown = document.querySelector(".js-countdown");
  const countDownValues = document.querySelectorAll(".js-countdownValue");
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 10, 19, 10, 0);
  endDate.innerHTML = `Offer ends on <time>${weekdays[futureDate.getDay()]}, ${futureDate.getDate()} ${
    months[futureDate.getMonth()]
  } ${futureDate.getFullYear()} ${futureDate.getHours()}:${futureDate.getMinutes()}</time>`;
  const futureTime = futureDate.getTime();
  console.log(futureTime);
  setInterval(() => {
    const now = new Date().getTime();
    const diff = futureTime - now;
    const oneMinute = 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * 60 * 60 * 1000;
    let days = Math.floor(diff / oneDay);
    let hours = Math.floor((diff % oneDay) / oneHour);
    let minutes = Math.floor((diff % oneHour) / oneMinute);
    let seconds = Math.floor((diff % oneMinute) / 1000);
    let values = [days, hours, minutes, seconds];
    const fomart = (value) => (value >= 10 ? value : `0${value}`);
    countDownValues.forEach((value, index) => {
      value.innerHTML = fomart(values[index]);
    });
  }, 1000);
});
