let timerInterval;
let totalSeconds = 0;
let isPaused = false;

const display = document.getElementById("display");
const minuteInput = document.getElementById("minuteInput");

// Format time as 00:00:00
function formatTime(sec) {
  let hrs = Math.floor(sec / 3600);
  let mins = Math.floor((sec % 3600) / 60);
  let secs = sec % 60;

  return (
    String(hrs).padStart(2, "0") + ":" +
    String(mins).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0")
  );
}

function updateDisplay() {
  display.textContent = formatTime(totalSeconds);
}

// Start Timer (directly from input)
function startTimer() {
  // If timer already running → do nothing
  if (timerInterval) return;

  // Get minutes from input
  let minutes = parseInt(minuteInput.value);

  if (isNaN(minutes) || minutes <= 0) {
    alert("Enter valid minutes!");
    return;
  }

  // Convert minutes to seconds
  totalSeconds = minutes * 60;
  updateDisplay();

  isPaused = false;

  timerInterval = setInterval(() => {
    if (!isPaused) {
      totalSeconds--;
      updateDisplay();

      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("⏰ Time's up!");
      }
    }
  }, 1000);
}

function pauseTimer() {
  const pauseBtn = document.getElementById("stop");

  if (!timerInterval) return; // do nothing if timer is not running

  // Toggle pause/resume
  isPaused = !isPaused;

  if (isPaused) {
    pauseBtn.innerText = "Resume";
  } else {
    pauseBtn.innerText = "Pause";
  }
}


function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  totalSeconds = 0;
  updateDisplay();
}
 
const { ipcRenderer } = require("electron");

document.getElementById("minimize").addEventListener("click", () => {
  ipcRenderer.send("minimize-app");
});

document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});

