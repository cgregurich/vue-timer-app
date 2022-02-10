import {DEBUG} from '../utils/constants';
const DELAY = DEBUG ? 10 : 1000;
let secondsElapsed = 0;
let intervalId;
onmessage = function(e) {
  const eventName = e.data.eventName;
  if (eventName === 'startStopwatch') {
    secondsElapsed = 0;
    startInterval();
  }
  else if (eventName === 'pauseStopwatch') {
    clearInterval(intervalId);
  }
  else if (eventName === 'resumeStopwatch') {
    startInterval();
  }
  else if (eventName === 'stopStopwatch') {
    clearInterval(intervalId);
  }
}

function startInterval() {
  intervalId = setInterval(tick, DELAY);
}

function tick() {
  secondsElapsed++;
  postMessage({eventName: 'updateClock', secondsElapsed: secondsElapsed});
}

function stop() { // eslint-disable-line
  clearInterval(intervalId);
}