<template>
    <div>
        <q-checkbox v-model="val" />
    </div>
</template>
<script setup>
const taskProps = defineProps({
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    }
})
</script>