<template>
    <div>
        <div class="flex justify-between dashboard-list-title items-center">
          <h6 class="text-bold">{{ list.title }}</h6>
          <q-btn icon="more_horiz" flat round dense v-close-popup>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="() => redirectToList(list._id)">
                  <q-item-section>Voir</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="isOpenedUpdateListDialog=true">
                  <q-item-section>Editer</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="isDeleteListDialogOpened=true">
                  <q-item-section class="text-negative">Supprimer</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <DeleteList :listId="list._id" :isOpened="isDeleteListDialogOpened" @onCloseInParent="closeDeleteListDialog"/>
        <UpdateListForm :isOpened="isOpenedUpdateListDialog" :listId="list._id" :title="list.title" @onCloseInParent="onCloseUpdateListDialog"/>
        <div v-if="list.tasks && list.tasks.length">
          <div v-for="(task, index) in list.tasks" v-bind:key="index" class="flex items-center">
            <q-checkbox v-model="task.isChecked" @click="() => onChangeIsChecked(task._id, {isChecked: task.isChecked})"/>
            <p>{{ task.name }}</p>
          </div>
          <q-btn no-caps @click="() => redirectToList(list._id)">Voir la liste complète</q-btn>
        </div>
        <div v-else style="padding: 1em;">
          <p style="font-size: 16px">Cette liste ne contient aucune tâches ajoutez en une depuis la liste</p>
          <q-btn no-caps @click="() => redirectToList(list._id)">Voir ma liste</q-btn>
        </div>
    </div>
</template>
<script setup>

import { useUserStore } from 'src/stores/user-store'
import { useListsStore } from 'src/stores/lists-store'
import { useTasksStore } from 'src/stores/tasks-store'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

import DeleteList from 'src/components/List/DeleteList.vue'
import UpdateListForm from 'src/components/List/UpdateListForm.vue'

const userStore = useUserStore();
const listsStore = useListsStore();
const tasksStore = useTasksStore();
const route = useRoute();
const router = useRouter();

const lists = ref([])
const isDeleteListDialogOpened = ref(false)
const isOpenedUpdateListDialog = ref(false)

const dashboardListItemProps = defineProps({
    list: {
        type: String,
        required: true
    },

})

const redirectToList = (id) => {
    router.push({ name: 'list-view', params: {id} })
    console.log(id)
}

const closeDeleteListDialog = () => {
    isDeleteListDialogOpened.value = false;
}

const onCloseUpdateListDialog = () => {
    isOpenedUpdateListDialog.value = false;
}

const onChangeIsChecked = async (taskId, params) => {
console.log("bonsoir oui ?", params)
await tasksStore.updateTask(taskId, params)
}
</script>