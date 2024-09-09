const http = require('http');
const helper = require('./helpers')

const port = 3000;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
    helper.parseBodyJson(req, (err, payload) => {
        const obj = {
            c: Number(payload.a) + Number(payload.b)
        }

        res.setHeader("Content-Type", 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(obj))
    })

});

server.listen(port, host, () => {
    console.log(`server is available at ${host}:${port}`)
})

