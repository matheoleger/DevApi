<template>
    <q-dialog v-model=isShown @hide="onClose">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Modifier la tâche</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>
            <q-card-section>
                <q-input label="Nom" v-model="modifiedTask.name"/>
                <q-input label="Description" v-model="modifiedTask.description"/>
            </q-card-section>
            <q-card-section>
                <q-btn @click="onUpdate" class="purple-btn-inline" no-caps>Modifier</q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>     
</template>
<script setup>

import {ref, watch} from "vue"
import { useListsStore } from 'src/stores/lists-store';
import { useTasksStore } from 'src/stores/tasks-store';

const listsStore = useListsStore();
const tasksStore = useTasksStore();


const modifiedTask = ref({
    name: modifiedTaskProps.name,
    description: modifiedTaskProps.description
})

const isShown = ref(modifiedTaskProps.isOpened);

const emit = defineEmits(['onCloseInParent', 'onUpdateInParent'])

const modifiedTaskProps = defineProps({
    listId: {
        type: String,
        required: true,
    },
    taskId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isOpened: {
        type: Boolean,
        default: false,
        required: true,
    }
})

watch(() => modifiedTaskProps.isOpened, (isOpenedInParent, prevIsOpened) => {
    console.log("oui je watch", isOpenedInParent)
    isShown.value = isOpenedInParent;
    modifiedTask.value.name = modifiedTaskProps.name
    modifiedTask.value.description = modifiedTaskProps.description
})

const onUpdate = async () => {
    console.log(modifiedTask.value)
    await tasksStore.updateTask(modifiedTaskProps.taskId, modifiedTask.value);
    listsStore.lists = await listsStore.getLists(); 
    listsStore.currentList = await listsStore.getListById(modifiedTaskProps.listId);
    tasksStore.currentTasks = listsStore.currentList.tasks;
    tasksStore.splitTasks();

    onClose()
}

const onClose = () => {
    isShown.value = false;
    emit('onCloseInParent', isShown)
}

</script>