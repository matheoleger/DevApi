import Task from "#components/task/taskModel.js"
import Joi from 'joi'

export async function getTasks(ctx) {
    try {
        ctx.body = await Task.find() 

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function getTaskById(ctx) {
    try {
        ctx.body = await Task.findById(ctx.params.id)
    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const taskValidationSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            isChecked: Joi.boolean().required()
        })

        const {error} = taskValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)

        Task.create(ctx.request.body)

        ctx.body = ctx.request.body

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function deleteById(ctx) {
    try {
        ctx.body = await Task.findByIdAndDelete(ctx.params.id)
    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function updateById(ctx) {
    try {
        const taskValidationSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            isChecked: Joi.boolean().required()
        })

        const {error} = taskValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)

        ctx.body = await Task.findByIdAndUpdate(ctx.params.id, ctx.request.body, {runValidators: true})

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}