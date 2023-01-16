<template>
  <div class="flex items-center column" >
    <h1 class="text-weight-bold">
        Hello {{userStore.fullName}} !👋
    </h1>
    <div v-if="!lists" class="no-lists">
      <p>Tu n'as aucune liste de tâche pour le moment créer en une en cliquant sur le bouton ci-dessous dans le menu pour débuter</p>
      <q-btn class="create-list-btn q-py-sm text-weight-bold" no-caps>Créer une liste</q-btn>
    </div>
    <div v-else>
      <!-- <div v-for="(list, index) in listsStore.lists" v-bind:key="index" class="dashboard-list">
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
          <p style="font-size: 16px">Cette liste n'est pas éditable depuis cette page... Regardez votre liste en cliquant sur "Voir ma liste"</p>
          <q-btn no-caps @click="() => redirectToList(list._id)">Voir ma liste</q-btn>
        </div>
      </div> -->
      <DashboardListItem 
        v-for="(list, index) in listsStore.lists" 
        v-bind:key="index" 
        :list="list"
        class="dashboard-list"
      />
    </div>
  </div>
</template>
<script setup>
  import {ref, onMounted} from "vue"
  import { useUserStore } from 'src/stores/user-store'
  import { useListsStore } from 'src/stores/lists-store'
  import { useTasksStore } from 'src/stores/tasks-store'
  import { useRoute, useRouter } from 'vue-router'
  
  import DashboardListItem from 'src/components/DashboardListItem.vue'

  const userStore = useUserStore();
  const listsStore = useListsStore();
  const tasksStore = useTasksStore();
  const route = useRoute();
  const router = useRouter();

  const lists = ref([])
  const isDeleteListDialogOpened = ref(false)
  const isOpenedUpdateListDialog = ref(false)

  const isChecked = ref(false)

  onMounted(async() => {
    userStore.user = await userStore.getUserProfile();
    lists.value = listsStore.listsByAscending();
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
<style lang="scss">
  h1 {
    font-size: 3rem;
    color: $dark-purple;
  }

  p {
    font-size: 1.2rem;
    margin: 0px;
  }

  .no-lists {
    width: 500px;
  }

  .create-list-btn {
    background-color: $purple;
    color: #fff;
    font-size: 1rem;
  }

  .dashboard-list {
    width: 33em;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.14);
    margin-top: 10px;
  }

  .dashboard-list-title {
    background-color: $gray-6;
    border-radius: 10px 10px 0px 0px;
  }

  .dashboard-list-title h6 {
    margin: 0.8em;
  }
</style>