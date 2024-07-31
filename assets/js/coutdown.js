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
const CountDownValues = document.querySelectorAll(".js-countdownValue");
const currenDate = new Date();
const futureDate = new Date(currenDate.getFullYear(), currenDate.getMonth(), currenDate.getDate() + 10, 19, 10, 0);
endDate.innerHTML = `Offer ends on <span${weekdays[futureDate.getDay()]}, ${futureDate.getDate()} ${
  months[futureDate.getMonth()]
} ${futureDate.getFullYear()} ${futureDate.getHours()}:${futureDate.getMinutes()}</span>`;
const futureTime = futureDate.getTime();
setInterval(() => {
  const now = new Date().getTime();
  const diff = futureTime - now;
  const onMinute = 60 * 1000;
  const onHour = 60 * 60 * 1000;
  const onDay = 24 * 60 * 60 * 1000;
  let days = Math.floor(diff / onDay);
  let hours = Math.floor((diff % onDay) / onHour);
  let minutes = Math.floor((diff % onHour) / onMinute);
  let seconds = Math.floor((diff % onMinute) / 1000);
  values = [days, hours, minutes, seconds];
  const format = (value) => (value >= 10 ? value : `0${value}`);
  CountDownValues.forEach((value, index) => (value.innerHTML = format(values[index])));
}, 1000);
