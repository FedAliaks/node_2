const http = require('http');

const port = 3000;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
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

function parseBodyJson(req, cb) {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = body.join('').toString();
        const params = JSON.parse(body);
        cb(null, params)
    })
}