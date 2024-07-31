const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  months = [
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
  ],
  endDate = document.querySelector(".js-endDate"),
  CountDownValues = document.querySelectorAll(".js-countdownValue"),
  currenDate = new Date(),
  futureDate = new Date(currenDate.getFullYear(), currenDate.getMonth(), currenDate.getDate() + 10, 19, 10, 0);
endDate.innerHTML = `Offer ends on <span${weekdays[futureDate.getDay()]}, ${futureDate.getDate()} ${
  months[futureDate.getMonth()]
} ${futureDate.getFullYear()} ${futureDate.getHours()}:${futureDate.getMinutes()}</span>`;
const futureTime = futureDate.getTime();
setInterval(() => {
  let e = new Date().getTime(),
    t = futureTime - e;
  values = [
    Math.floor(t / 864e5),
    Math.floor((t % 864e5) / 36e5),
    Math.floor((t % 36e5) / 6e4),
    Math.floor((t % 6e4) / 1e3),
  ];
  let u = (e) => (e >= 10 ? e : `0${e}`);
  CountDownValues.forEach((e, t) => (e.innerHTML = u(values[t])));
}, 1e3);
