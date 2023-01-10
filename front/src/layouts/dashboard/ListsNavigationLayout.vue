<template>
    <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="500"
        class="drawer"
        style="margin-top: 3em"
    >
      <q-scroll-area class="fit">
        <div class="flex items-center justify-around">
            <h5>Mes listes</h5>
            <q-btn> + </q-btn>
        </div>
      </q-scroll-area>
    </q-drawer>
</template>
<script setup>
</script>
<style lang="scss">
    .drawer {
        background-color: $gray-6;
    }
</style>
