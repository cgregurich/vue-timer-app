const DELAY = 10;
let secondsRemaining = 0;
let intervalId;
onmessage = function(e) {
  const eventName = e.data.eventName;
  if (eventName === 'startTimer') {
    secondsRemaining = e.data.seconds;
    startInterval();
  }
  else if (eventName === 'pauseTimer') {
    clearInterval(intervalId);
  }
  else if (eventName === 'resumeTimer') {
    startInterval();
  }
  else if (eventName === 'stopTimer') {
    stop(false);
  }
}

function startInterval() {
  intervalId = setInterval(tick, DELAY);
}

function tick() {
  secondsRemaining--;
  postMessage({eventName: 'updateClock', secondsRemaining: secondsRemaining});
  if (secondsRemaining <= 0) stop(true);
}
function stop(isAutoEnd) { 
  // isAutoEnd - True if timer naturally ran out of time, false if user chose to stop early
  clearInterval(intervalId);
  postMessage({eventName: 'timerDone', notifyUser: isAutoEnd});
}