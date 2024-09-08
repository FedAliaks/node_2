const http = require('http');

const port = 3000;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", 'text/plain');
    res.statusCode = 200;
    res.end('Hello world')
});

server.listen(port, host, () => {
    console.log(`server is available at ${host}:${port}`)
})