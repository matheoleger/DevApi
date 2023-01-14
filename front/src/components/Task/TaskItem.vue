<template>
    <div class="flex items-center task-item justify-between">
        <q-checkbox v-model="isChecked" @click="emit('onChecked', id, isChecked)"/>
        <div>
          <h6 class="q-my-sm">{{ name }}</h6>
          <p>{{ description }}</p>
        </div>
        <q-btn icon="more_horiz" flat round dense v-close-popup>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Editer</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section class="text-negative">Supprimer</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </q-btn>
    </div>
</template>
<script setup>

import {ref, watch} from "vue"

const isChecked = ref(taskProps.isCheckedInParent);

const emit = defineEmits(['onChecked'])
const taskProps = defineProps({
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