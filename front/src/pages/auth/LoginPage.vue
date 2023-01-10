<template>
    <div class="flex column flex-center">
        <h2>Connectez vous</h2>
        <q-card-section class="shadow-sm">
            <q-input label="Email" type="email" outlined v-model="form.email"/>
            <q-input label="Mot de passe" type="password" outlined v-model="form.password"/>
            <q-checkbox label="terms and conditions" v-model="form.terms_and_conditions"/>
            <q-btn label="s'inscrire" @click="handleLogin" class="full-width" color="primary"/>
            <p>Vous n'avez pas de compte ? <a href="/register">Inscrivez vous</a></p>
        </q-card-section>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStore } from 'stores/user-store'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const form = ref({
  email: '',
  password: '',
  terms_and_conditions: false
})
const handleLogin = async () => {
  try {
    await userStore.handleLogin(form.value)
    router.push({ name: 'dashboard' })
  } catch (e) {
    Notify.create('Error during register')
  }
}
</script>