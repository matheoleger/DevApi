<template>
    <q-dialog v-model=isShown @hide="onClose">
        <q-card style="width: 350px">
            <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Supprimer une liste</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>
            <q-card-section style="margin-top: 10px">
                <p style="font-size: 16px">Vous êtes sur le point de supprimer votre liste êtes vous sûr de vouloir faire ça ?</p>
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

const listsStore = useListsStore();

const isShown = ref(deleteListProps.isOpened);

const emit = defineEmits(['onCloseInParent', 'onDeleteInParent'])

const deleteListProps = defineProps({
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

watch(() => deleteListProps.isOpened, (isOpenedInParent, prevIsOpened) => {
    isShown.value = isOpenedInParent;
})

const onClose = () => {
    isShown.value = false;
    emit('onCloseInParent', isShown)
}

const onDelete = async () => {
    await listsStore.deleteList(deleteListProps.listId);
    emit('onDeleteInParent')
    onClose()
}

</script>