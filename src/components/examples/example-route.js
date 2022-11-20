import Router from "@koa/router"
import * as ExampleControllers from "#components/examples/example-controllers.js"

const examples = new Router()

examples.get('/', ExampleControllers.index)
examples.post('/', (ctx)=>{
    ExampleControllers.create(ctx)
})

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

examples.get('/', (ctx, next) => {
    ctx.body = "Hello !";
})

examples.get('/examples', (ctx, next) => {
    ctx.body = todos;
})

examples.get('/examples/:id', (ctx, next) => {
    ctx.body = todos.find(todo => todo.id == ctx.params.id);
})

examples.post('/examples', (ctx, next) => {
    let todo = ctx.request.body;
    console.log(todo)
    todo.id = todos.length+1;
    todos.push(todo);
    ctx.response.status = 201;
    ctx.body = todo
})

examples.put('/examples/:id', (ctx, next) => {
    let todoIndex = todos.findIndex(todo => todo.id == ctx.params.id);
    let newTodo = ctx.request.body;
    newTodo.id = todos[todoIndex].id
    todos[todoIndex] = newTodo;
    ctx.response.status = 201;
    ctx.body = newTodo;
})

examples.delete('/examples/:id', (ctx, next) => {
    let todoIndex = todos.findIndex(todo => todo.id == ctx.params.id);
    todos.splice(todoIndex, 1);
    ctx.response.status = 201;
    ctx.body = `Value of ID : ${ctx.params.id} was deleted !`
})

export default examples