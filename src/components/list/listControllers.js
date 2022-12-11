import List from "#components/list/listModel.js"
import Task from "#components/task/taskModel.js"
import Joi from 'joi'

export async function getLists(ctx) {
    try {
        ctx.body = await List.findByUserId(ctx.state.user.id) 

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

        const userId = ctx.state.user.id
        const newList = await List.create({...ctx.request.body, user: userId})

        ctx.body = newList

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function deleteById(ctx) {
    try {
        const deletedList = await List.findOneAndRemove({_id: ctx.params.id, user: ctx.state.user.id})

        if(deletedTask) {
            ctx.body = deletedList
        } else {
            ctx.status = 401
        }

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function updateById(ctx) {
    try {
        const listValidationSchema = Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            isChecked: Joi.boolean()
        })

        const {error} = listValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)

        const updatedList = await List.findOneAndUpdate({_id: ctx.params.id, user: ctx.state.user.id}, ctx.request.body, {runValidators: true})

        if(updatedList) {
            ctx.body = updatedList
        } else {
            ctx.status = 401    
        }

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}