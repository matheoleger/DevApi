import { defineStore } from 'pinia'
// import { LocalStorage, SessionStorage } from 'quasar'
import { getAllLists, createList, getListById } from 'src/services/lists'

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [],
    currentList: {}
  }),
  getters: {
    listsByAscending: (state) => {
      const lists = state.lists

      return lists
    }
  },
  actions: {
    async getLists () {
      const res = await getAllLists()

      // console.log(res.data)

      return res.data;

    },
    async getListById (id) {
      console.log("ceci est l'id", id)
      const res = await getListById(id)

      console.log(res.data)
      return res.data;

    },
    async createNewList (newList) {

      await createList(newList)

      this.lists = await this.getLists();
    }
  }
})