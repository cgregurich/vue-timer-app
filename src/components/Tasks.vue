<template>
	<div class="tasks">
		<AddTask @add-task="addTask"/>
		<button @click="toggleShowTasks">{{ showTasks ? 'Hide Tasks' : 'Show Tasks' }}</button>

		<ShowTasks
			@update-task="updateTask"
			@delete-task="deleteTask"
			:tasks="tasks"
			v-show="showTasks"
		/>
	</div>	
</template>

<script>
import AddTask from './AddTask';
import ShowTasks from './ShowTasks';
import * as api from '../utils/apiCalls.js';
export default {
	name: 'Tasks',
	components: {
		AddTask,
		ShowTasks,
	},
	data() {
		return {
			showAddTask: true,
			showTasks: false,
			tasks: [],
		};
	},
	methods: {
		toggleShowTasks() {
			this.showTasks = !this.showTasks;
		},
		async addTask(newTask) {
			const res = await api.addTask(newTask);
			this.tasks.push(await res.json());
		},
		deleteTask(taskId) {
			this.tasks = this.tasks.filter(task => task.id !== taskId);
			api.deleteTask(taskId);
			this.$store.dispatch('deleteTask', taskId);
		},
		updateTask(updatedTask) {
			this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
			api.updateTask(updatedTask);
		}
	},
	async created() {
		this.tasks = await api.fetchTasks();
	},
};
</script>

<style scoped>
</style>