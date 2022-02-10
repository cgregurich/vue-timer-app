import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../utils/apiCalls';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    selectedTask: null,
  },
  mutations: {
    changeTask(state, task) {
      state.selectedTask = task;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id === taskId);
      state.selectedTask = null;
    } 
  },
  actions: {
    async loadTasks() {
      const tasks = await api.fetchTasks();
      this.commit('setTasks', tasks);
    },
    async changeTask(context, id) {
      const task = await api.fetchTask(id);
      this.commit('changeTask', task);
    },
    setTask({ commit }, task) { // eslint-disable-line no-unused-vars
      this.state.selectedTask = task;
    },
    deleteTask(context, taskId) { // eslint-disable-line no-unused-vars
      this.commit('deleteTask', taskId);
      this.selectedTask = null;
    }
  },
  getters: {
    selectedTaskName(state) { // eslint-disable-line no-unused-vars
      return state.selectedTask?.name;
    },
    selectedTaskId(state) { // eslint-disable-line no-unused-vars
      return state.selectedTask?.id;
    }
  },
})
