<template>
    <div class="flex items-center task-item justify-between">
        <div class="flex">
          <q-checkbox v-model="isChecked" @click="emit('onChecked', id, isChecked)"/>
          <div v-if="isChecked" style="margin-left: 20px">
            <h6 class="q-my-sm text-strike">{{ name }}</h6>
            <p class="text-strike">{{ description }}</p>
          </div>
          <div v-else style="margin-left: 20px">
            <h6 class="q-my-sm">{{ name }}</h6>
            <p>{{ description }}</p>
          </div>
        </div>
        <q-btn icon="more_horiz" flat round dense v-close-popup>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Editer</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="isOpenedDeleteDialog=true">
                  <q-item-section class="text-negative">Supprimer</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </q-btn>
        <DeleteTask :listId="listId" :taskId="id" :isOpened="isOpenedDeleteDialog" @onCloseInParent="onCloseDeleteDialog"/>
    </div>
</template>
<script setup>

import {onMounted, ref, watch} from "vue"

import DeleteTask from "src/components/Task/DeleteTask.vue"


const isChecked = ref(taskProps.isCheckedInParent);
const isOpenedDeleteDialog = ref(false);

const emit = defineEmits(['onChecked'])
const taskProps = defineProps({
    listId: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    isCheckedInParent: {
        type: Boolean,
        default: false
    }
})

const onCloseDeleteDialog = () => {
  isOpenedDeleteDialog.value = false;
}

onMounted(() => {
  console.log({id: taskProps.id})
})

// // Change value of isChecked in terms of isCheckedInParent
// watch(taskProps.isChecked, (isCheckedInParent, prevIsCheckedInParent) => {
//   isChecked.value = isCheckedInParent;
// })

</script>
<style lang="scss">
  .task-item {
    width: 55em;
    background-color: $gray-6;
    border-radius: 10px;
  }
</style>