import User from '#components/user/userModel.js'
import Joi from 'joi'
import argon2 from "argon2"
import { sendWelcomeEmail } from "#services/mailing/welcomeEmail.js"

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
        await sendWelcomeEmail(user, user.settings.validation_email_token)
        const token = user.generateJWT()
        ctx.ok({ token })

        if(error) throw new Error(error)
    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function login(ctx) {
    try {
        const loginValidationSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        })

        const params = ctx.request.body
        const { error, value } = loginValidationSchema.validate(params)

        if(error) throw new Error(error)

        const currentUserByEmail = await User.findOne({email: value.email}).select('password') 

        if(await argon2.verify(currentUserByEmail.password, value.password)) {
            const token = currentUserByEmail.generateJWT()
            ctx.ok({token})
        } else {
            ctx.status(401)
        }

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function modifyProfile(ctx) {
    try {
        const modifyProfileValidationSchema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().min(6),
        })

        const params = ctx.request.body
        const { error } = modifyProfileValidationSchema.validate(params)

        if(error) throw new Error(error)

        await User.findByIdAndUpdate(ctx.state.user.id, params, {runValidators: true})

        ctx.ok("Successfully modify your profile ;)")
        
    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}