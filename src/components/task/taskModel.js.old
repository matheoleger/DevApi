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
    },
    list: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'List'
    }
}, {
    timestamps: true
})

taskSchema.static({
    findByListId(listId) {
        return this.find({list: listId})
    }
})

const Task = mongoose.model('Task', taskSchema)

export default Task;
