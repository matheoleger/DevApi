<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
            <q-avatar rounded>
              <img v-bind:src="'src/assets/logo.png'">
            </q-avatar>
          </q-toolbar-title>
        <router-link to="/login">
          Se connecter
        </router-link>
        <q-btn outline label="S'inscrire" color="primary" no-caps class="q-mx-md" to="/register"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
</script>