<template>
	<div>
		<div v-show="!isEditing" class="task not-editing">
			<div class="task-name">{{ task.name }}</div>
			<div class="icons">
				<i class="fas fa-trash delete-icon" @click="deleteClicked"></i>
				<i class="far fa-edit edit-icon" @click="editClicked"></i>
			</div>
		</div>
		<div v-show="isEditing" class="task editing">
			<input
				v-show="isEditing"
				v-model="enteredTaskName"
				type="text"
				@keypress.enter="saveEdit"
				@keydown.esc="cancelEdit"
			>
			<div class="icons">
				<i @click="cancelEdit" class="fas fa-times cancel-icon"></i>
				<i @click="saveEdit" class="fas fa-check save-icon"></i>
			</div>
		</div>

	</div>	
</template>

<script>
export default {
	name: 'Task',
	props: {
		task: Object,
	},
	data() {
		return {
			isEditing: false,
			enteredTaskName: this.task.name,
			originalTaskName: this.task.name,
		};
	},
	methods: {
		editClicked() {
			this.toggleEdit();
		},
		deleteClicked() {
			if (confirm('Delete task?')) this.$emit('delete-task', this.task.id);
		},
		cancelEdit() {
			this.enteredTaskName = this.originalTaskName;
			this.toggleEdit();
		},
		saveEdit() {
			console.log(`save edit of: ${this.originalTaskName} -> ${this.enteredTaskName}`);
			const updatedTask = {...this.task, name: this.enteredTaskName};
			this.$emit('update-task', updatedTask);
			this.toggleEdit();
		},
		toggleEdit() {
			this.isEditing = !this.isEditing;
		}
	}
	
};
</script>

<style scoped>
.task {
	font-size: 20px;	
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5px 0;
	justify-content: center;
}
.task-name {
	color: white;
}
.icons {
	color: white;
	display: flex;
	align-items: center;
}
.icons > i {
	margin: 0 5px;
}
.delete-icon {
	margin: 0 3px;
	cursor: pointer;
	font-size: 15px;
}
.edit-icon {
	font-size: 15px;
	cursor: pointer;
}
.cancel-icon {
	color: white;
	cursor: pointer;
}
.save-icon {
	color: white;
	cursor: pointer;
}
.editing  i{
	font-size: 20px;
}
.editing input {
	font-size: 20px;
}

</style>