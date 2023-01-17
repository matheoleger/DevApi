<template>
    <q-dialog v-model=isShown @hide="onClose">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Créer une tâche</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="onClose"/>
            </q-card-section>
            <q-card-section>
                <q-input label="Nom" v-model="newTask.name"/>
                <q-input label="Description (optionel)" v-model="newTask.description"/>
            </q-card-section>
            <q-card-section>
                <q-btn @click="onCreate" class="purple-btn-inline" no-caps>Créer</q-btn>
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


const newTask = ref({
    name: "",
    description: undefined,
    isChecked: false
})

const isShown = ref(createTaskFormProps.isOpened);

const emit = defineEmits(['onCloseInParent'])

const createTaskFormProps = defineProps({
    listId: {
        type: String,
        required: true,
    },
    isOpened: {
        type: Boolean,
        default: false,
        required: true,
    }
})

watch(() => createTaskFormProps.isOpened, (isOpenedInParent, prevIsOpened) => {
    isShown.value = isOpenedInParent;
})

const onCreate = async () => {
    await tasksStore.createTask({...newTask.value, list: createTaskFormProps.listId});
    listsStore.lists = await listsStore.getLists(); 
    listsStore.currentList = await listsStore.getListById(createTaskFormProps.listId);
    tasksStore.currentTasks = listsStore.currentList.tasks;
    tasksStore.splitTasks();

    onClose()
}

const onClose = () => {
    isShown.value = false;
    emit('onCloseInParent', isShown)
}

    
</script>