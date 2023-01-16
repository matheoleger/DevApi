<template>
    <q-dialog v-model=isShown @hide="onClose">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Modifier la tâche</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>
            <q-card-section>
                <q-input label="Title" v-model="modifiedList.title"/>
            </q-card-section>
            <q-card-section>
                <q-btn @click="onUpdate">Modifier</q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>     
</template>
<script setup>

import {ref, watch} from "vue"
import { useListsStore } from 'src/stores/lists-store';
import { updateList } from "src/services/lists";

const listsStore = useListsStore();

const modifiedList = ref({
    title: modifiedListProps.title
})

const isShown = ref(modifiedListProps.isOpened);

const emit = defineEmits(['onCloseInParent', 'onUpdateInParent'])

const modifiedListProps = defineProps({
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

watch(() => modifiedListProps.isOpened, (isOpenedInParent, prevIsOpened) => {
    console.log("oui je watch", isOpenedInParent)
    isShown.value = isOpenedInParent;
    modifiedList.value.title = modifiedListProps.title
})

const onUpdate = async () => {
    await listsStore.updateList(modifiedListProps.listId, modifiedList.value);
    listsStore.lists = await listsStore.getLists(); 
    listsStore.currentList = await listsStore.getListById(modifiedListProps.listId);
}

const onClose = () => {
    isShown.value = false;
    emit('onCloseInParent', isShown)
}

</script>