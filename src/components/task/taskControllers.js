import Task from "#components/task/taskModel.js"
import List from "#components/list/listModel.js"
import Joi from 'joi'

export async function getTasks(ctx) {
    try {
        ctx.body = await Task.findByUserId(ctx.state.user.id)

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function getTaskById(ctx) {
    try {
        const task = await Task.findOne({_id: ctx.params.id, user: ctx.state.user.id})

        if(task) {
            ctx.body = task;
        } else {
            ctx.status = 401;
        }
    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function getAllByList() {
    try {
        if(!ctx.params.listId) throw new Error('No id spplied')
        const tasks = await TaskModel.findByListId(ctx.params.listId)
        ctx.ok(tasks)

    } catch(e) {

    }
}

export async function create(ctx) {
    try {
        const taskValidationSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            isChecked: Joi.boolean().required(),
            list: Joi.string().required()
        })

        const {error} = taskValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)

        const userId = ctx.state.user.id
        const currentList = await List.findOne({_id: ctx.request.body.list, user: userId})

        if(!currentList) throw new Error("List doesn't belongs to current user !")

        Task.create({...ctx.request.body, user: userId})

        ctx.body = ctx.request.body

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function deleteById(ctx) {
    try {
        const deletedTask = await Task.findOneAndRemove({_id: ctx.params.id, user: ctx.state.user.id})

        if(deletedTask) {
            ctx.body = deletedTask
        } else {
            ctx.status = 401
        }
    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}

export async function updateById(ctx) {
    try {
        const taskValidationSchema = Joi.object({
            name: Joi.string(),
            description: Joi.string(),
            isChecked: Joi.boolean()
        })

        const {error} = taskValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)

        const updatedTask = await Task.findOneAndUpdate({_id: ctx.params.id, user: ctx.state.user.id}, ctx.request.body, {runValidators: true})

        if(updatedTask) {
            ctx.ok({...updatedTask._doc, name: ctx.request.body.name, isChecked: ctx.request.body.isChecked})
        } else {
            ctx.status = 401
        }

    } catch(e) {
        ctx.badRequest({message: e.message})
    }
}