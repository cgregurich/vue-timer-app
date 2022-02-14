<template>
	<div class="show-sessions">
		<button @click="sortSessions">Sort by Task</button>
		<button @click="wipeSessions">Wipe Sessions</button>
		<div class="totals">
			<div class="total" v-for="task in Object.keys(totals)" :key="task">
				<div class="task">{{ task }}</div>
				<div class="time">{{ formatTime(totals[task]) }}</div>
			</div>
		</div>
		<div class="session" v-for="session in sessions" :key="session.id">
			<p>ID: {{ session.id }}</p>
			<p>Task: {{ session.taskName }}</p>
			<p>Raw time: {{ session.timeElapsed }} sec</p>
			<p>Formatted: {{ formatTime(session.timeElapsed) }}</p>
			<hr>
		</div>
	</div>	
</template>

<script>
import * as api from '../utils/apiCalls.js';
import { formatSecondsAsHMS } from '../utils/helpers.js';
export default {
	name: 'ShowSessions',
	data() {
		return {
			sessions: [],
			totals: [],
		};
	},
	async created() {
		this.sessions = await api.fetchSessions(); 
		this.totals = await api.getSessionTotals();
	},
	methods: {
		async sortSessions() {
			this.sessions = await api.fetchSessionsSortByTaskName();
		},
		formatTime(seconds) {
			return formatSecondsAsHMS(seconds);
		},
		wipeSessions() {
			if (confirm('Delete all sessions?')) {
				api.deleteAllSessions();
			}
		}
	},
}
</script>

<style>
p {
	margin: 0 0;
	font-family: Poppins;
	color: white;
}
.total {
	width: max-content;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0px;
}
</style>