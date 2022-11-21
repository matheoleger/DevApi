import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import nanoidDictionary from "nanoid-dictionary";

const { numbers } = nanoidDictionary;

const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    settings: {
        terms_and_conditions: {
            type: Boolean,
            default: false
        },
        is_email_validated: {
            type: Boolean,
            default: false
        },
        validation_email_token: String
    }
}, {
    timestamps: true
})

userSchema.method({
    generateEmailVerificationToken () {
        const token = customAlphabet(numbers, 5)()
        this.settings.validation_email_token = token
    }
})

const User = mongoose.model('User', userSchema)

export default User