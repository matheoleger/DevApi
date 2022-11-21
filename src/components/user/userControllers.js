import User from '#components/user/userModel.js'
import Joi from 'joi'
import argon2 from "argon2"


export async function register(ctx) {
    try {
        const registerValidationSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            terms_and_conditions: Joi.boolean().valid(true).required()
        })

        const params = ctx.request.body
        const { error, value } = registerValidationSchema.validate(params)
        const hashedPassword = await argon2.hash(value.password)
        const newUser = new User({
            ...value,
            password: hashedPassword,
            settings: {
                terms_and_conditions: value.terms_and_conditions
            }
        })
        newUser.generateEmailVerificationToken()
        const user = await newUser.save()
        ctx.ok(user)

        if(error) throw new Error(error)
    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function login(ctx) {

}