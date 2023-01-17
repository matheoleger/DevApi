<template>
    <div class="flex items-center column">
        <div class="flex justify-between items-center">
          <div class="flex items-center" style="width: 55em">
            <q-btn no-caps unelevated class="btn-return" style="margin-right: 20px" @click="router.push({ name: 'dashboard' })" icon="arrow_back_ios_new"/>
            <h3 class="text-bold">{{ listsStore.currentList.title }}</h3>
          </div>
          <q-btn icon="more_horiz" flat round dense v-close-popup>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="isOpenedUpdateListDialog=true">
                  <q-item-section>Editer</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="isOpenedDeleteDialog=true">
                  <q-item-section class="text-negative">Supprimer</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <DeleteList :isOpened="isOpenedDeleteDialog" :listId="route.params.id" @onCloseInParent="onCloseDeleteDialog" @onDeleteInParent="onDeleteList"/>
          <UpdateListForm :isOpened="isOpenedUpdateListDialog" :listId="route.params.id" :title="listsStore.currentList.title" @onCloseInParent="onCloseUpdateListDialog"/>
        </div>
        <div style="width: 55em">
          <q-btn @click="isOpenedCreateListForm = true" outline no-caps class="purple-btn-outline">+ Ajouter une tâche</q-btn>
        </div>
        <CreateTaskForm :isOpened="isOpenedCreateListForm" :listId="route.params.id" @onCloseInParent="onCloseCreateListDialog"/>
        <div v-if="listsStore.currentList.tasks">
            <h4>Tâches - {{ tasksStore.tasksUnchecked.length }}</h4>
            <TaskItem 
                v-for="(task, index) in tasksStore.tasksUnchecked" 
                v-bind:key="index"
                :id="task._id"
                :listId="route.params.id"
                :name="task.name"
                :description="task.description"
                :isChecked="task.isChecked"
                @onChecked="onChecked"
            />
            <h4>Tâches complétées- {{ tasksStore.tasksChecked.length }}</h4>
            <TaskItem 
                v-for="(task, index) in tasksStore.tasksChecked" 
                v-bind:key="index"
                :id="task._id"
                :listId="route.params.id"
                :name="task.name"
                :description="task.description"
                :isCheckedInParent="task.isChecked"
                @onChecked="onChecked"
            />
        </div>
    </div>
</template>
<script setup>
    import { useListsStore } from "src/stores/lists-store"
    import { useTasksStore } from "src/stores/tasks-store"
    import { updateTask } from "src/services/tasks"
    import { onMounted, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    import CreateTaskForm from 'components/Task/CreateTaskForm.vue'
    import TaskItem from 'src/components/Task/TaskItem.vue'
    import DeleteList from "src/components/List/DeleteList.vue"
    import UpdateListForm from "src/components/List/UpdateListForm.vue"

    const route = useRoute();
    const router = useRouter();
    const listsStore = useListsStore();
    const tasksStore = useTasksStore();

    const isOpenedCreateListForm = ref(false)
    const isOpenedDeleteDialog = ref(false)
    const isOpenedUpdateListDialog = ref(false)

    const onCloseCreateListDialog = () => {
      isOpenedCreateListForm.value = false;
    }

    const onChecked = async (idOfTask, isChecked) => {
        const newTasks = listsStore.currentList.tasks.map(task => task._id == idOfTask ? {...task, isChecked: isChecked} : task)
        listsStore.currentList.tasks = newTasks
        tasksStore.currentTasks = newTasks
        tasksStore.splitTasks();

        try {
            await updateTask(idOfTask, {isChecked})
        } catch(e) {
            throw Error(e);
        }
    }

    onMounted(async () => {
        const id = route.params.id

        listsStore.currentList = await listsStore.getListById(id)
        tasksStore.currentTasks = listsStore.currentList.tasks
        tasksStore.splitTasks();
    })

    const onCloseDeleteDialog = () => {
      isOpenedDeleteDialog.value = false;
    }

    const onCloseUpdateListDialog = () => {
      isOpenedUpdateListDialog.value = false;
    }

    const onDeleteList = () => {
      router.push({ name: 'dashboard'})
    }

</script>
<style lang="scss">
.btn-return {
  margin: 0 20px;
  background-color: $gray-6;
  color: $gray-dove;
  padding: 0.7em;
  border-radius: 10px;
}
</style>
