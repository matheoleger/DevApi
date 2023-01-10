import http, { request } from 'http';

const dumb = {
    property1: () => console.log('toto')
}

const server = http.createServer((req, res) => {
    console.log(req)
    if(req.url == "/api/products" && req.method == "GET") {
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(JSON.stringify({
            id: 1,
            name: "Google Pixel 4a 5G",
            color: "black",
        }))
    } else {
        res.writeHead(404, {'Content-type': 'application/json'})
        res.end(JSON.stringify({
            message: "Not found"
        }))

    }

})

const PORT = process.env.PORT || 5000

server.listen(PORT, ()=> console.log(`listening on port : ${PORT}`))