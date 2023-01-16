<template>
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" class="drawer">
        <CreateListForm :isOpened="isOpenedCreateListForm" @onCloseInParent="onCloseCreateListForm"/>
        <q-scroll-area class="fit">
        <div class="flex items-center justify-around">
            <h5 class="text-bold">Mes listes</h5>
            <q-btn @click="isOpenedCreateListForm = true"> 
                + 
            </q-btn>
        </div>
        <div class="text-bold">
            <div v-if="listsStore.lists && listsStore.lists.length">
                <div v-for="(list, index) in listsStore.lists" v-bind:key="index" >
                    <div v-if="list._id == route.params.id" class="cursor-pointer list-element list-element-selected" @click="() => redirectToList(list._id)">
                        <p class="list-title">{{ list.title }}</p>
                    </div>
                    <div v-else class="cursor-pointer list-element" @click="() => redirectToList(list._id)">
                        <p class="list-title">{{ list.title }}</p>
                    </div>
                </div>
            </div>
            <p v-else>
                Vous n'avez aucune liste... Créez-en une première pour commencer en cliquant sur le bouton + 
            </p>
        </div>
      </q-scroll-area>
    </q-drawer>
</template>
<script setup>
    import { useListsStore } from "src/stores/lists-store"
    import { useRoute, useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'

    import CreateListForm from "src/components/List/CreateListForm.vue";

    const listsStore = useListsStore();

    const route = useRoute();
    const router = useRouter();

    const isOpenedCreateListForm = ref(false);

    const newList = ref({
        title: undefined,
    })

    const redirectToList = (id) => {
        router.push({ name: 'list-view', params: {id} })
        console.log(id)
    }

    // const createNewList = async (title, description) => {
    //     if(description) {
    //         await createList({title, description})
    //     } else {
    //         await createList({title})
    //     }

    //     listsStore.lists = await listsStore.getLists();
    // }

    onMounted(async() => {
        listsStore.lists = await listsStore.getLists();
    })

    const onCloseCreateListForm = () => {
        isOpenedCreateListForm.value = false;
    }

</script>
<style lang="scss">
    .drawer {
        background-color: $gray-6;
    }

    .list-element {
        padding: 1em;
        // margin: 0 35px; 
    }

    .list-title {
        margin: 0 20px; 
    }

    .list-element:hover {
        background-color: $gray-4;
    }

    .list-element-selected {
        background-color: $gray-4;
        color: $purple;
    }
</style>
