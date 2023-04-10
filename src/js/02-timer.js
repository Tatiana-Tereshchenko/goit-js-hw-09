import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
let selectedDate = null;
const DELAY = 1000;
const options = {

    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
            selectedDate = selectedDates[0]
        if (selectedDate > new Date()) {
        startBtn.disabled = false
        }
        else {
            startBtn.disabled = true
        Notiflix.Notify.failure('select a date in the future');
        }
    },
};

flatpickr(dateTimePicker, options);
Notiflix.Report.info('Hello!', 'Choose a date then click on start',);


function updateTimer() {

    const currentDate = new Date();
    const remainingTime = selectedDate - currentDate.getTime();
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        return
    }
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    daysEl.innerHTML = addLeadingZero(days);
    hoursEl.innerHTML = addLeadingZero(hours);
    minutesEl.innerHTML = addLeadingZero(minutes);
    secondsEl.innerHTML = addLeadingZero(seconds);
}

    let timerInterval;
    
    startBtn.addEventListener('click', () => {
        updateTimer();
        timerInterval = setInterval(updateTimer, DELAY)
    });

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}


console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}