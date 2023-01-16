import { defineStore } from 'pinia'
// import { LocalStorage, SessionStorage } from 'quasar'


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
    }
  }
})