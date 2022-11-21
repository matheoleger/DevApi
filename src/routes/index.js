import Router from "@koa/router"
import taskRoutes from "#components/task/taskRoute.js"
import exampleRoutes from "#components/examples/example-route.js"

const API_V1_ROUTER = new Router({prefix: '/api/v1'})


API_V1_ROUTER.use(exampleRoutes.routes(), exampleRoutes.allowedMethods())
API_V1_ROUTER.use(taskRoutes.routes(), taskRoutes.allowedMethods())

export {API_V1_ROUTER}
