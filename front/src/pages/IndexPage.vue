<template>
  <q-page class="flex flex-center">
    <div>
      <h5>Ynov Tasks Manager</h5>
      <p>Try out this new lightweight tasks manager for everyday tasks</p>
      <q-btn no-caps @click="redirectDashboard">Get started</q-btn>
    </div>
    <img v-bind:src="'src/assets/header-img.png'"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();

const redirectDashboard = async () => {
 await router.push({name: 'dashboard'})
}

export default defineComponent({
  name: 'IndexPage'
})
</script>
