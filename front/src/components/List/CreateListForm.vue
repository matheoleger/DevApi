<template>
    <q-dialog v-model=isShown @hide="onClose">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Créer une liste</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="onClose"/>
            </q-card-section>
            <q-card-section>
                <q-input label="Titre" v-model="newList.title"/>
            </q-card-section>
            <q-card-section>
                <q-btn @click="onCreate">Créer</q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup>
import {ref, watch} from "vue"
import { useListsStore } from 'src/stores/lists-store';
// import { useTasksStore } from 'src/stores/tasks-store';

const listsStore = useListsStore();
// const tasksStore = useTasksStore();

const newList = ref({
    title: ""
})

const isShown = ref(createListFormProps.isOpened);

const emit = defineEmits(['onCloseInParent'])

const createListFormProps = defineProps({
    isOpened: {
        type: Boolean,
        default: false,
        required: true,
    }
})

watch(() => createListFormProps.isOpened, (isOpenedInParent, prevIsOpened) => {
    console.log("oui je watch", isOpenedInParent)
    isShown.value = isOpenedInParent;
})

const onCreate = async () => {
    console.log(newList.value)
    await listsStore.createNewList(newList.value);
    listsStore.lists = await listsStore.getLists(); 

    onClose()
}

const onClose = () => {
    isShown.value = false;
    emit('onCloseInParent', isShown)
}

    
</script>