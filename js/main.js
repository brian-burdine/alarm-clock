const startTime = new Date();
let currentHours = startTime.getHours();
let currentMinutes = startTime.getMinutes();
let currentSeconds = startTime.getSeconds();

const displayHours = document.querySelector(".hours");
const displayMinutes = document.querySelector(".minutes");
const displaySeconds = document.querySelector(".seconds");

displayHours.textContent = currentHours;
displayMinutes.textContent = currentMinutes;
displaySeconds.textContent = currentSeconds;