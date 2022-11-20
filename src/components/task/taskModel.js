import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isChecked: {
        type: Boolean,
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema)

export default Task;
