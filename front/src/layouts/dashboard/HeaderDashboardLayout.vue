<template>
      <q-header elevated class="text-black header-layout">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar rounded>
              <img v-bind:src="'src/assets/logo.png'">
            </q-avatar>
          </q-toolbar-title>
          <a class="dashboard-link" href="/#/dashboard">Tableau de bord</a>
        </q-toolbar>
      </q-header>
</template>
<script setup>
</script>
<style lang="scss">
.header-layout {
  background-color: $gray-6;
}

.dashboard-link {
  transition: all 0.5s ease-in-out;
  color: $gray-1;
  text-decoration: none;
}

.dashboard-link:hover {
  color: $purple;
  font-weight: 700;
}
</style>