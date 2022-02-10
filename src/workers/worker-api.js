import TimerWorker from 'worker-loader!./timerWorker';
import StopwatchWorker from 'worker-loader!./stopwatchWorker';

export const timerWorker = new TimerWorker();
export const stopwatchWorker = new StopwatchWorker();