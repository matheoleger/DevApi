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

const findAll = async () => {
    const tasks = await Task.find()
    console.log('FIND ALL ================', tasks);
}

const findById = async () => {
    const task = await Task.findById('637219c10a1d76792aa53b81')
    console.log(task);
}

const updateById = async () => {
    const task = await Task.findByIdAndUpdate('637219c10a1d76792aa53b81', {
        name: 'Premier élément modifié'
    },{
        runValidators: true
    })
}

const deleteById = async () => {
    const task = await Task.findByIdAndDelete('637219c10a1d76792aa53b81')
}

export default Task;
