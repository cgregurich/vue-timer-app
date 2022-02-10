<template>
	<div class="show-tasks">
		<Task v-for="task in tasks" :task="task" :key="task.id"
			@delete-task="deleteTask"
			@update-task="updateTask"
		/>
	</div>	
</template>

<script>
import Task from './Task';
export default {
	name: 'Tasks',
	components: {
		Task,
	},
	props: {
		tasks: Array,
	},
	methods: {
		deleteTask(taskId) {
			this.$emit('delete-task', taskId);
		},
		updateTask(task) {
			this.$emit('update-task', task);
		}
	},
}
</script>

<style>
</style>