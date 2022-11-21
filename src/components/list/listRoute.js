import Router from "@koa/router"
import * as ListControllers from "#components/list/listControllers.js"

const lists = new Router()

lists.get('/lists', ListControllers.getLists)
lists.get('/lists/:id', (ctx) => ListControllers.getListById(ctx))
lists.delete('/lists/:id', ListControllers.deleteById)
lists.put('/lists/:id', ListControllers.updateById)
lists.post('/lists', (ctx)=>ListControllers.create(ctx))

export default lists