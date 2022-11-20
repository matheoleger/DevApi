import Router from "@koa/router"
import * as TaskControllers from "#components/task/taskControllers.js"

const tasks = new Router()

tasks.get('/tasks', TaskControllers.getTasks)
tasks.get('/tasks/:id', (ctx) => TaskControllers.getTaskById(ctx))
tasks.delete('/tasks/:id', TaskControllers.deleteById)
tasks.put('/tasks/:id', TaskControllers.updateById)
tasks.post('/tasks', (ctx)=>TaskControllers.create(ctx))

export default tasks