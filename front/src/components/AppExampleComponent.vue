<template>
    <div>
        <q-card>
            <q-card-section>
                <p>{{  props.title }}</p>
            </q-card-section>
        </q-card>
    </div>
</template>
<script setup>
const props = defineProps({
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