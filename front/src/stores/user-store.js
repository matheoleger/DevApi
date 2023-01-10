import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { register, login } from 'src/services/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  }),
  getters: {},
  actions: {
    async handleRegister (params) {
      try {
        const res = await register(params)
        LocalStorage.set('token', res.data.token)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async handleLogin (params) {
      try {
        const res = await login(params)
        LocalStorage.set('token', res.data.token)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    }
  }
})