<template>
    <q-dialog v-model=isShown @hide="onClose">
        <q-card style="width: 350px">
            <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Supprimer une tâche</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>
            <q-card-section style="margin-top: 10px">
                <p style="font-size: 16px">Vous êtes sur le point de supprimer votre tâche. Êtes vous sûr de vouloir faire ça ?</p>
            </q-card-section>
            <q-card-section class="flex items-center justify-evenly">
                <q-btn @click="onClose" no-caps outline class="purple-btn-outline">Annuler</q-btn>
                <q-btn @click="onDelete" no-caps color="negative">Supprimer</q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup>
import {ref, watch} from "vue"
import { useListsStore } from 'src/stores/lists-store';
import { useTasksStore } from 'src/stores/tasks-store';
import { deleteTask } from "src/services/tasks"

const listsStore = useListsStore();
const tasksStore = useTasksStore();

const isShown = ref(deleteTaskProps.isOpened);

const emit = defineEmits(['onCloseInParent'])

const deleteTaskProps = defineProps({
    listId: {
        type: String,
        required: true,
    },
    taskId: {
        type: String,
        required: true,
    },
    isOpened: {
        type: Boolean,
        default: false,
        required: true,
    }
})

watch(() => deleteTaskProps.isOpened, (isOpenedInParent, prevIsOpened) => {
    console.log("oui je watch", isOpenedInParent)
    isShown.value = isOpenedInParent;
})

const onClose = () => {
    isShown.value = false;
    emit('onCloseInParent', isShown)
}

const onDelete = async () => {
    console.log({id: deleteTaskProps.taskId})
    // await listsStore.deleteList(deleteTaskProps.listId);

    try {
        await deleteTask(deleteTaskProps.taskId);
        listsStore.lists = await listsStore.getLists(); 
        listsStore.currentList = await listsStore.getListById(deleteTaskProps.listId);
        tasksStore.currentTasks = listsStore.currentList.tasks
        tasksStore.splitTasks();
    } catch(e) {
        throw new Error(e);
    }

    onClose()
}

</script>