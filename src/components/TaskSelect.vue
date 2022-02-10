<template>
	<div class="task-select">
		<select v-model="selectedTaskId">
			<option value="null" selected>None</option>
			<option v-for="task in tasks" :key="task.id" :value="task.id">{{ task.name }}</option>
		</select>
	</div>	
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'TaskSelect',
	methods: {
		test() {
			console.log(this.tasks);
			console.log(this.apple)
		}
	},
	computed: {
		...mapState([
			'tasks'
		]),
		selectedTaskId: {
			get() {
				const id = this.$store.state.selectedTask?.id;
				if (!id) return null;
				return id;
			},
			set(id) {
				this.$store.dispatch('changeTask', id);
			}
		}
},
	created() {
		this.$store.dispatch('loadTasks');
	}
};
</script>

<style scoped>
</style>