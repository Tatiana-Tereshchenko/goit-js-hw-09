
const startBtn = document.querySelector("[data-start]");
const stoptBtn = document.querySelector("[data-stop]");

let timerId = null;
const DELAY = 1000;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
        startBtn.disabled = true;
    }, DELAY)
});

stoptBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.disabled = false;
});
