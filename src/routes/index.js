import Router from "@koa/router"
import taskRoutes from "#components/task/taskRoute.js"
import listRoutes from "#components/list/listRoute.js"
import userRoutes from "#components/user/userRoutes.js"
import exampleRoutes from "#components/examples/example-route.js"

const API_V1_ROUTER = new Router({prefix: '/api/v1'})

API_V1_ROUTER.use(exampleRoutes.routes(), exampleRoutes.allowedMethods())
API_V1_ROUTER.use(taskRoutes.routes(), taskRoutes.allowedMethods())
API_V1_ROUTER.use(listRoutes.routes(), listRoutes.allowedMethods())
API_V1_ROUTER.use(userRoutes.routes(), userRoutes.allowedMethods())

export {API_V1_ROUTER}
