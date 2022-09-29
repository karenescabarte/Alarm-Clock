const timeNow = document.querySelector("h1");
const setAlarmTime = document.querySelector(".set-alarm");
const selectedOption = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");

let alarmTime;
let ringtone = new Audio("./files/ringtone.mp3");
let isAlarmSet = false;

for (var i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectedOption[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (var i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectedOption[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (var i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectedOption[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  // if an hour is 0, set this value to 12
  h = h == 0 ? (h = 12) : h;

  // Adding 0 befire hr, min, sec if this value is less the 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  timeNow.innerText = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

function setAlarm() {
  if (isAlarmSet) {
    // if isAlarmSet is true
    alarmTime = "";
    ringtone.pause();
    setAlarmTime.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }

  // getting hour , minute, ampm select tag value
  let time = `${selectedOption[0].value}:${selectedOption[1].value} ${selectedOption[2].value}`;
  if (
    time.includes("hour") ||
    time.includes("minute") ||
    time.includes("am/pm")
  ) {
    return alert("Please select a time!");
  }

  isAlarmSet = true;
  alarmTime = time;
  setAlarmTime.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);
