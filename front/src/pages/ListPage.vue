<template>
    <div>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <q-btn no-caps style="margin-right: 20px" @click="router.push({ name: 'dashboard' })">&lt;</q-btn>
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
        <q-btn @click="isOpened = true" no-caps>+ Ajouter une tâche</q-btn>
        <CreateTaskForm :isOpened="isOpened" :listId="route.params.id" @setIsClosed="setIsClosed"/>
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

    const isOpened = ref(false)
    const isOpenedDeleteDialog = ref(false)
    const isOpenedUpdateListDialog = ref(false)

    // const tasksUnchecked = ref([])
    // const tasksChecked = ref([])

    // To close the dialog
    const setIsClosed = () => {
        isOpened.value = false;
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

        console.log({id})

        listsStore.currentList = await listsStore.getListById(id)
        tasksStore.currentTasks = listsStore.currentList.tasks
        tasksStore.splitTasks();
        console.log(listsStore.currentList)
        // splitTasks(listsStore.currentList.tasks)
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

    // const splitTasks = (tasks) => {
    //     tasksUnchecked.value = tasks.filter(task => !task.isChecked)
    //     tasksChecked.value = tasks.filter(task => task.isChecked)
    // }

</script>
<style lang="scss">
//   .dashboard-list {
//     width: 33em;
//     border-radius: 10px;
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.14);
//   }

//   .dashboard-list-title {
//     background-color: $gray-6;
//     border-radius: 10px 10px 0px 0px;
//   }

//   .dashboard-list-title h3 {
//     margin: 0.8em;
//   }
</style>
