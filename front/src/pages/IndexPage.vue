<template>
  <q-page class="flex flex-center">
    <div>
      <h5 class="text-bold text-h2 title" style="margin-bottom: 0.5em">Ynov Tasks Manager</h5>
      <p style="width: 500px; margin-bottom: 1em; font-size: 26px;">Try out this new lightweight tasks manager for everyday tasks</p>
      <q-btn no-caps @click="redirectDashboard" label="Get Started" class="btn-get-started"/>
    </div>
    <img v-bind:src="'src/assets/header-img.png'"/>
  </q-page>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();

const redirectDashboard = () => {
  router.push({name: "dashboard"})
}

</script>
<style lang="scss">
.btn-get-started {
  background-color: $purple;
  color: white;
  font-weight: 700;
  font-size: 20px;
  border-radius: 10px;
}

.title {
  color: $purple;
}
</style>
