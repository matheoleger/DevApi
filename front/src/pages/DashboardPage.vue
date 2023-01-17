<template>
  <div class="flex items-center column" >
    <h1 class="text-weight-bold">
        Hello {{userStore.fullName}} !👋
    </h1>
    <div v-if="!listsStore.lists.length || !listsStore.lists" class="no-lists">
      <p>Tu n'as aucune liste de tâche pour le moment créer en une en cliquant sur le bouton ci-dessous dans le menu pour débuter</p>
      <q-btn class="create-list-btn q-py-sm text-weight-bold" no-caps @click="isOpenedCreateListForm=true">Créer une liste</q-btn>
      <CreateListForm :isOpened="isOpenedCreateListForm" @onCloseInParent="onCloseCreateListForm"/>
    </div>
    <div v-else>
      <p class="text-h5">Voici les dernières tâches que tu as ajoutés</p>
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
  import CreateListForm from 'src/components/List/CreateListForm.vue';

  const userStore = useUserStore();
  const listsStore = useListsStore();
  const tasksStore = useTasksStore();
  const route = useRoute();
  const router = useRouter();

  const lists = ref([])
  const isDeleteListDialogOpened = ref(false)
  const isOpenedUpdateListDialog = ref(false)

  const isOpenedCreateListForm = ref(false)

  const isChecked = ref(false)

  onMounted(async() => {
    userStore.user = await userStore.getUserProfile();
    lists.value = listsStore.lists;
  })

  const redirectToList = (id) => {
    router.push({ name: 'list-view', params: {id} })
  }

  const closeDeleteListDialog = () => {
    isDeleteListDialogOpened.value = false;
  }

  const onCloseUpdateListDialog = () => {
      isOpenedUpdateListDialog.value = false;
    }

  const onChangeIsChecked = async (taskId, params) => {
    await tasksStore.updateTask(taskId, params)
  }

  const onCloseCreateListForm = () => {
    isOpenedCreateListForm.value = false
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
    margin-top: 40px;
    padding-bottom: 1em;
  }
</style>