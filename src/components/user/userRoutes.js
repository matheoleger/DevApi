import Router from '@koa/router'
import * as UserControllers from "#components/user/userControllers.js"
import {isAuthenticated,isAuthenticatedWithUser} from "#middlewares/jwtHandler.js"

const users = new Router()

users.post("/register", UserControllers.register)
users.post("/login", UserControllers.login)
users.get("/profile", isAuthenticatedWithUser, (ctx) => {
    ctx.ok({profile: ctx.state.user})
})
users.post("/profile/modify", isAuthenticatedWithUser, UserControllers.modifyProfile)

export default users