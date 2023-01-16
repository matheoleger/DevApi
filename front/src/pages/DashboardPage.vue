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
      <div v-for="(list, index) in listsStore.lists" v-bind:key="index" class="dashboard-list">
        <div class="flex justify-between dashboard-list-title items-center">
          <h6 class="text-bold">{{ list.title }}</h6>
          <q-btn icon="more_horiz" flat round dense v-close-popup>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="() => redirectToList(list._id)">
                  <q-item-section>Voir</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
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
        <div v-if="list.tasks">

        </div>
        <div v-else style="padding: 1em;">
          <p style="font-size: 16px">Cette liste ne contient aucune tâches ajoutez en une depuis la liste</p>
          <q-btn no-caps @click="() => redirectToList(list._id)">Voir ma liste</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {ref} from "vue"
  import { useUserStore } from 'src/stores/user-store'
  import { useListsStore } from 'src/stores/lists-store'
  import { useRoute, useRouter } from 'vue-router'
  import { onMounted } from 'vue'

  import DeleteList from 'src/components/List/DeleteList.vue'

  const userStore = useUserStore();
  const listsStore = useListsStore();
  const route = useRoute();
  const router = useRouter();

  const lists = ref([])
  const isDeleteListDialogOpened = ref(false)

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

  const consoleLog = () => {
    console.log("niquetamere")
  }

</script>
<style lang="scss">
  h1 {
    font-size: 3rem;
    color: $dark-purple;
  }

  p {
    font-size: 1.2rem;
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
  }

  .dashboard-list-title {
    background-color: $gray-6;
    border-radius: 10px 10px 0px 0px;
  }

  .dashboard-list-title h6 {
    margin: 0.8em;
  }
</style>