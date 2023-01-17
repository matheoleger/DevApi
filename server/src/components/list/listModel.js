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
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

listSchema.static({
    findByUserId(userId) {
        return this.find({user: userId})
    }
})

const List = mongoose.model('List', listSchema)

export default List;
