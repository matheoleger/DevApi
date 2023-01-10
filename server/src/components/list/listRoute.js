import Router from "@koa/router"
import * as ListControllers from "#components/list/listControllers.js"
import {isAuthenticatedWithUser} from "#middlewares/jwtHandler.js"

const lists = new Router()

lists.get('/lists', isAuthenticatedWithUser, ListControllers.getLists)
lists.get('/lists/:id', isAuthenticatedWithUser, (ctx) => ListControllers.getListById(ctx))
lists.delete('/lists/:id', isAuthenticatedWithUser, ListControllers.deleteById)
lists.put('/lists/:id', isAuthenticatedWithUser, ListControllers.updateById)
lists.post('/lists', isAuthenticatedWithUser, (ctx)=>ListControllers.create(ctx))

export default lists