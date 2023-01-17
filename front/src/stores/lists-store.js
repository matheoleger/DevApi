import { defineStore } from 'pinia'
import { getAllLists, createList, getListById, deleteList, updateList } from 'src/services/lists'

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [],
    currentList: {}
  }),
  getters: {
    listsByAscending: (state) => {
      const lists = state.lists
      lists.sort((a,b) =>  new Date(b.tasks[0].updatedAt) - new Date(a.tasks[0].updatedAt))

      return lists
    }
  },
  actions: {
    async getLists () {
      const res = await getAllLists()

      return res.data;
    },
    async getListById (id) {
      const res = await getListById(id)

      return res.data;

    },
    async createNewList (newList) {

      await createList(newList)

      this.lists = await this.getLists();
    },
    async deleteList (listId) {
      await deleteList(listId)

      this.lists = await this.getLists();
    },
    async updateList (listId, params) {
      await updateList(listId, params)
    }
  }
})