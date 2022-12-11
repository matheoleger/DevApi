import Router from "@koa/router"
import * as TaskControllers from "#components/task/taskControllers.js"
import {isAuthenticated,isAuthenticatedWithUser} from "#middlewares/jwtHandler.js"

const tasks = new Router()

tasks.get('/tasks', isAuthenticatedWithUser, TaskControllers.getTasks)
// tasks.get('/tasks/protected', isAuthenticatedWithUser, (ctx) => {
//     ctx.ok({
//         message: "This route is protected",
//         user: ctx.state.user
//     })
// })
tasks.get('/tasks/:id', isAuthenticatedWithUser, (ctx) => TaskControllers.getTaskById(ctx))
tasks.delete('/tasks/:id', isAuthenticatedWithUser, TaskControllers.deleteById)
tasks.put('/tasks/:id', isAuthenticatedWithUser, TaskControllers.updateById)
tasks.post('/tasks', isAuthenticatedWithUser, (ctx)=>TaskControllers.create(ctx))

export default tasks