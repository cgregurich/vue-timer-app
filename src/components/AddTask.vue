<template>
	<div class="add-task">
		<input v-model="enteredTaskName" type="text" @keypress.enter="addTask" placeholder="Add Task">
	</div>	
</template>

<script>
export default {
	name: 'AddTask',
	data() {
		return {
			enteredTaskName: '',
		};
	},
	methods: {
		addTask() {
			if (this.enteredTaskName === '') return;
			console.log(`task: ${this.enteredTaskName}`);
			const newTask = {name: this.enteredTaskName};
			this.$emit('add-task', newTask);
			this.enteredTaskName = '';
			console.log('here');
		}
	},
};
</script>

<style scoped>
</style>