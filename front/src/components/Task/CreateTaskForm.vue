<template>
    <q-dialog v-model=this.isShown @hide="onClose">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Créer une tâche</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="onClose"/>
            </q-card-section>
            <q-card-section>
                <q-input label="Title" v-model="newTask.name"/>
                <q-input label="Description (optionel)" v-model="newTask.description"/>
            </q-card-section>
            <q-card-section>
                <q-btn @click="onValidForm">Créer</q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script>

    import {createTask} from "src/services/tasks"
    import { useListsStore } from "src/stores/lists-store"
    const listsStore = useListsStore();
    

    export default {
        name: "CreateTaskForm",
        data() {
            return {
                isShown: false,
                newTask: {
                    name: "",
                    description: ""
                }
            }
        },
        props: {
            isOpened: {
                type: Boolean,
                default: false,
                required: true,
            },
            listId: {
                type: String,
                default: "",
                required: true,
            }
        },
        watch: { 
            isOpened: function(newVal, oldVal) {
                this.isShown = newVal //set isShown to the new value of isOpened (from parent)
            }
        },
        methods: {
            async onValidForm() {
                this.onClose()
                await this.createTask()
            },
            onClose() {
                this.testOpened = false;
                console.log(this.testOpened)
                this.$emit('setIsClosed') //use the function setIsClosed (from parent) to redefined isOpened
            },
            async createTask() {
                console.log(this.newTask)
                try {
                    // if(description) {
                    //     await createTask({...this.newTask, isChecked: false})
                    // } else {
                    //     await createTask({name, isChecked: false})
                    // }

                    let newTaskToCreate = {isChecked: false, list: this.listId, name: this.newTask.name, description: undefined}

                    if(this.newTask.description) {
                        newTaskToCreate.description = this.newTask.description;
                    } 

                    await createTask(newTaskToCreate)
                    listsStore.currentList = await listsStore.getListById(this.listId)

                } catch(e) {
                    throw Error(e)
                }
            }
            
        }
    }
</script>