<template>
	<div class="timer">
		<TaskSelect/>
		<div class="clock">{{ formattedClockTime }}</div>
		<div class="timer-inputs">
			<input @keydown.enter="start" :disabled="isInputDisabled" v-model="enteredTime.hour" class="timer-input" type="number">:
			<input @keydown.enter="start" :disabled="isInputDisabled" v-model="enteredTime.min" class="timer-input" type="number">:
			<input @keydown.enter="start" :disabled="isInputDisabled" v-model="enteredTime.sec" class="timer-input" type="number">
			<i :style="{visibility: isStopped ? 'visible' : 'hidden'}" @click="resetInput" class="fas fa-undo reset-icon"></i>
		</div>
		<div class="clock-buttons">
			<button class="clock-button" :disabled="isLeftBtnDisabled" @click="stopClicked">Stop</button>
			<button class="clock-button" @click="rightBtnClicked">{{ rightBtnText }}</button>
		</div>
		<FlashMessage></FlashMessage>
	</div>	
</template>

<script>
import { RUNNING, STOPPED, PAUSED, DEBUG} from '../utils/constants.js'; //eslint-disable-line no-unused-vars
import * as helpers from '../utils/helpers.js';
import TaskSelect from './TaskSelect';
import { timerWorker } from '../workers/worker-api.js';
import { mapState, mapGetters } from 'vuex';
import * as api from '../utils/apiCalls';
export default {
	name: 'Timer',
	components: {
		TaskSelect,
	},
	data() {
		return {
			clockState: STOPPED,
			startTimestamp: null,
			enteredTime: {hour: 0, min: 0, sec: 10},
			secondsRemaining: 0,
		};
	},
	created() {
		this.setupWorkerListeners();
		this.secondsRemaining = this.enteredTimeAsSeconds;
	},
	methods: {
		test() {
			this.flash()
		},
		setupWorkerListeners() {
			timerWorker.onmessage = event => {
				const eventName = event.data.eventName;
				if (eventName === 'updateClock') {
					this.secondsRemaining = event.data.secondsRemaining;
				}
				else if (eventName === 'timerDone') {
					this.stop(event.data.notifyUser);
				}
			};
		},
		start() {
			if (this.clockState != STOPPED || this.enteredTimeAsSeconds <= 0) return;
			timerWorker.postMessage({eventName: 'startTimer', seconds: this.enteredTimeAsSeconds});
			this.clockState = RUNNING;
		},
		pause() {
			this.clockState = PAUSED;
			timerWorker.postMessage({eventName: 'pauseTimer'});
		},	
		resume() {
			this.clockState = RUNNING;
			timerWorker.postMessage({eventName: 'resumeTimer'});
		},
		stop(notifyUser) {
			this.clockState = STOPPED;
			if (notifyUser) {
				this.playSound();
				if (!document.hasFocus()) this.sendPushNotification();
			}
			if (this.selectedTask) { 
				this.saveSession();
				this.flash();
			}
			else console.log(`untracked for ${helpers.formatSecondsAsHMS(this.secondsElapsed)}`);
			this.secondsRemaining = 0;
		},
		playSound() {
			let audio = new Audio('https://www.myinstants.com/media/sounds/ding-sound-effect_2.mp3');
			audio.play();
			console.log("DING!");
		},
		stopClicked() {
			timerWorker.postMessage({eventName: 'stopTimer'});
		},
		rightBtnClicked() {
			if (this.clockState === STOPPED) this.start();
			else if (this.clockState === RUNNING) this.pause();
			else this.resume();
		},
		resetInput() {
			if (this.clockState === STOPPED) {
				this.enteredTime = {hour: 0, min: 0, sec: 0};
			}
		},
		createSession() {
			return helpers.createSession(this.selectedTaskName, this.secondsElapsed);
		},
		saveSession() {
			const session = this.createSession();
			api.addSession(session);
		},
		flash() {
			const taskName = this.selectedTaskName;
			const elapsed = this.formattedSecondsElapsed;
			const msg = `${taskName} - ${elapsed}`;
			msg;
			this.flashMessage.success({
				title: 'Saved Session',
				message: `${taskName} - ${elapsed}`,
				time: 2000,
			});
		},
		sendPushNotification() {
			new Notification('Hello');
		},
	},
	watch: {
		enteredTimeAsSeconds() {
			this.secondsRemaining = this.enteredTimeAsSeconds;
		},
	},
	computed: {
		...mapState(['selectedTask']),
		...mapGetters(['selectedTaskName']),
		rightBtnText() {
			if (this.clockState === STOPPED) return 'Start';
			else if (this.clockState === RUNNING) return 'Pause';
			else return 'Resume';
		},
		enteredTimeAsSeconds() {
			return this.enteredTime.hour * 3600 + this.enteredTime.min * 60 + this.enteredTime.sec * 1;
		},
		secondsElapsed() {
			return this.enteredTimeAsSeconds - this.secondsRemaining;
		},
		formattedClockTime() {
			return helpers.formatSecondsAsHMS(this.secondsRemaining);
		},
		formattedSecondsElapsed() {
			return helpers.formatSecondsAsHMS(this.secondsElapsed);
		},
		isStopped() {
			return this.clockState === STOPPED;
		},
		isLeftBtnDisabled() {
			return this.isStopped;
		},
		isInputDisabled() {
			return !this.isStopped;
		},
	},
}
</script>

<style scoped>
.reset-icon:active {
	font-size: 17px;
	transition: 0.01s;
}
input[type="number"] {
	width: 65px;
	outline: none;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
	-webkit-appearance: none;
}
</style>