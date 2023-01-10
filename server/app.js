import Koa from "koa"
import bodyParser from "koa-bodyparser";
import respond from "koa-respond";
import '#config/database.js'
import '#config/maildev.js'
import {API_V1_ROUTER} from "#routes/index.js"
import cors from "@koa/cors"

const app = new Koa()

app
.use(cors({ origin: "*"}))
.use(bodyParser())
.use(respond())
.use(API_V1_ROUTER.routes())
.use(API_V1_ROUTER.allowedMethods())

app.listen(process.env.PORT, () => console.log(`server listening to port ${process.env.PORT}`))