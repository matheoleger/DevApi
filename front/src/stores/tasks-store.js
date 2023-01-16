import { defineStore } from 'pinia'
// import { LocalStorage, SessionStorage } from 'quasar'
import { updateTask, createTask } from 'src/services/tasks'


export const useTasksStore = defineStore('tasks', {
  state: () => ({
    currentTasks: [],
    tasksUnchecked: [],
    tasksChecked: [],
  }),
  getters: {
  },
  actions: {
    splitTasks() {
        this.tasksUnchecked = this.currentTasks.filter(task => !task.isChecked)
        this.tasksChecked = this.currentTasks.filter(task => task.isChecked)
    },
    async updateTask(taskId, params) {
      try {
        await updateTask(taskId, params)
      } catch(e) {
        throw new Error(e)
      }
    },
    async createTask(params) {
      try {
        await createTask(params)
      } catch(e) {
        throw new Error(e)
      }
    }
  }
})