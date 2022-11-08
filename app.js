import Koa from "koa"
import Router from "@koa/router"
import bodyParser from "koa-bodyparser";

const app = new Koa()
const router = new Router()

const todos = [
    {
        id: 1,
        title: "Acheter du lait"
    },
    {
        id: 2,
        title: "Acheter une marshall"
    },
    {
        id: 3,
        title: "Acheter l'album de Pomme"
    },
]

router.get('/', (ctx, next) => {
    ctx.body = "Hello !";
})

router.get('/todos', (ctx, next) => {
    ctx.body = todos;
})

router.get('/todos/:id', (ctx, next) => {
    ctx.body = todos.find(todo => todo.id == ctx.params.id);
})

router.post('/todos', (ctx, next) => {
    let todo = ctx.request.body;
    console.log(todo)
    todo.id = todos.length+1;
    todos.push(todo);
    ctx.response.status = 201;
    ctx.body = todo
})

router.put('/todos/:id', (ctx, next) => {
    let todoIndex = todos.findIndex(todo => todo.id == ctx.params.id);
    let newTodo = ctx.request.body;
    newTodo.id = todos[todoIndex].id
    todos[todoIndex] = newTodo;
    ctx.response.status = 201;
    ctx.body = newTodo;
})

router.delete('/todos/:id', (ctx, next) => {
    let todoIndex = todos.findIndex(todo => todo.id == ctx.params.id);
    todos.splice(todoIndex, 1);
    ctx.response.status = 201;
    ctx.body = `Value of ID : ${ctx.params.id} was deleted !`
})

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())

app.listen(process.env.PORT, () => console.log(`server listening to port ${process.env.PORT}`))