<template>
    <q-layout view="hHh LpR fFf">
        <HeaderDashboardLayout/>
        <ListsNavigationLayout/>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
<script setup>
    import HeaderDashboardLayout from "./HeaderDashboardLayout.vue"
    import ListsNavigationLayout from "./ListsNavigationLayout.vue";
</script>