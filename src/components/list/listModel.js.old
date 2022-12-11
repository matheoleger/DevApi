import mongoose from "mongoose";

const { Schema } = mongoose;

const listSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
    },
    created_at: {
        type:Date,
        required:true
    },
    updated_at: {
        type:Date,
        required:true
    }
}, {
    timestamp: true
})

const List = mongoose.model('List', listSchema)


// const newList = new List({ title: 'Courses', tasks: [{title: 'Acheter patate'}, { title: 'Acheter salade'}]})
// const newList = new List({title: 'Courses'})
// const {_id} 


// List.findById("637b58b5f7e373047455781c").then(list => {
//     const task = list.tasks.id('637b589393d3ca8c3cb26462')
//     task.title = "modifié"
//     // task.save()
//     console.log(task)
//     list.save()
//     // console.log(list.tasks.id('637b58b5f7e373047455781c'))
// })
// newList.tasks[0].title = "Acheter des pommes de terre"
// newList.tasks.id()

// newList.save()

export default List;
