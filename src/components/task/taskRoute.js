import Router from "@koa/router"
import * as TaskControllers from "#components/task/taskControllers.js"
import {isAuthenticatedWithUser} from "#middlewares/jwtHandler.js"

const tasks = new Router()

tasks.get('/tasks', isAuthenticatedWithUser, TaskControllers.getTasks)
tasks.get('/tasks/:id', isAuthenticatedWithUser, (ctx) => TaskControllers.getTaskById(ctx))
tasks.delete('/tasks/:id', isAuthenticatedWithUser, TaskControllers.deleteById)
tasks.put('/tasks/:id', isAuthenticatedWithUser, TaskControllers.updateById)
tasks.post('/tasks', isAuthenticatedWithUser, (ctx)=>TaskControllers.create(ctx))

export default tasks