function zeroPad(...nums) {
  const result = [];
  for (let num of nums) {
    result.push(num.toString().padStart(2, '0'));
  }
  return result;
}

function secondsToClockTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const m = Math.floor(totalSeconds / 60);
  totalSeconds %= 60;
  const s = totalSeconds;
  return [h, m, s];
}

export function formatSecondsAsHMS(seconds) {
  let h, m, s;
  [h, m, s] = secondsToClockTime(seconds);
  let hStr, mStr, sStr;
  [hStr, mStr, sStr] = zeroPad(h, m, s);
  const result = `${hStr}:${mStr}:${sStr}`;
  return result;
}

export function createSession(taskName, timeElapsed) {
  // unnecessary function for now, but will be useful when current date
  // and time needs to be calculated.... I think
  const session = {taskName: taskName, timeElapsed: timeElapsed};
  return session;
}

export function convertEmptyStringsToZeros(obj) {
  for (let key in obj) {
    obj[key] = obj[key] || 0;
  }
  return obj;
}