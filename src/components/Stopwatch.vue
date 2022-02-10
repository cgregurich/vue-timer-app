<template>
	<div class="stopwatch">
		<TaskSelect/>
		<div class="clock">{{ formattedClockTime }}</div>
		<div class="clock-buttons">
			<button class="clock-button" :disabled="isLeftBtnDisabled" @click="stopClicked">Stop</button>
			<button class="clock-button" @click="rightBtnClicked">{{ rightBtnText }}</button>
		</div>
	</div>
</template>

<script>
import { RUNNING, STOPPED, PAUSED }from '../utils/constants.js';
import { formatSecondsAsHMS, createSession } from '../utils/helpers.js';
import * as api from '../utils/apiCalls.js';
import TaskSelect from './TaskSelect.vue';
import { stopwatchWorker } from '../workers/worker-api.js';
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'Stopwatch',
	components: {
		TaskSelect,
	},
	data() {
		return {
			clockState: STOPPED,
			secondsElapsed: 0,
		};
	},
	created() {
		this.setupWorkerListeners();
	},
	methods: {
		setupWorkerListeners() {
			stopwatchWorker.onmessage = event => {
				const eventName = event.data.eventName;
				if (eventName === 'updateClock') {
					this.secondsElapsed = event.data.secondsElapsed;
				}
			};
		},
		stopClicked() {
			stopwatchWorker.postMessage({eventName: 'stopStopwatch'});
			this.stop();
		},
		rightBtnClicked() {
			if (this.clockState === STOPPED) this.start();
			else if (this.clockState === RUNNING) this.pause();
			else this.resume();
		},
		start() {
			stopwatchWorker.postMessage({eventName: 'startStopwatch'});
			this.clockState = RUNNING;
		},
		pause() {
			stopwatchWorker.postMessage({eventName: 'pauseStopwatch'});
			this.clockState = PAUSED;
		},
		resume() {
			stopwatchWorker.postMessage({eventName: 'resumeStopwatch'});
			this.clockState = RUNNING;
		},
		stop() {
			stopwatchWorker.postMessage({eventName: 'stopStopwatch'});
			this.clockState = STOPPED;
			if (this.selectedTask) this.saveSession();
			else console.log(`untracked for ${formatSecondsAsHMS(this.secondsElapsed)}`);
			this.secondsElapsed = 0;
		},
		saveSession() {
			const session = createSession(this.selectedTaskName, this.secondsElapsed);
			api.addSession(session);
		}
	},
	computed: {
		...mapState(['selectedTask']),
		...mapGetters(['selectedTaskName']),
		formattedClockTime() {
			return formatSecondsAsHMS(this.secondsElapsed);
		},
		rightBtnText() {
			if (this.clockState === STOPPED) return 'Start';
			else if (this.clockState === RUNNING) return 'Pause';
			else if (this.clockState === PAUSED) return 'Resume';
			return 'uh oh';
		},
		isLeftBtnDisabled() {
			return this.clockState === STOPPED;
		}
	},
};
</script>

<style scoped>
</style>