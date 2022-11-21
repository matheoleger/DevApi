import List from "#components/list/listModel.js"
import Task from "#components/task/taskModel.js"
import Joi from 'joi'

export async function getLists(ctx) {
    try {
        ctx.body = await List.find() 

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function getListById(ctx) {
    try {
        ctx.body = await List.findById(ctx.params.id)
        if ( !ctx. params.id) throw new Error( 'No id supplied')
        const list = await List.findById(ctx.params.id).lean()
        list.tasks = await Task.findByListId(ctx.params.id)
        if (!list) return ctx.notFound()
        ctx.ok( list)
    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const listValidationSchema = Joi.object({
            title: Joi.string().required(),
        })

        const {error} = listValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)

        List.create(ctx.request.body)

        ctx.body = ctx.request.body

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function deleteById(ctx) {
    try {
        ctx.body = await List.findByIdAndDelete(ctx.params.id)
    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function updateById(ctx) {
    try {
        const listValidationSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            isChecked: Joi.boolean().required()
        })

        const {error} = listValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)

        ctx.body = await List.findByIdAndUpdate(ctx.params.id, ctx.request.body, {runValidators: true})

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}