const http = require('http');
const helper = require('./helpers')
const handler = require('./handlers')

const port = 3000;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
    helper.parseBodyJson(req, (err, payload) => {
        const handlerURL = handler.getHandler(req.url);

        handlerURL(req, res, payload, (err, result) => {
            if (err) {
                res.statusCode = err.code;
                console.log(err.message);
                res.end( JSON.stringify(err) );
                return;
            }
            res.setHeader("Content-Type", 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(result))
        })


    })

});

server.listen(port, host, () => {
    console.log(`server is available at ${host}:${port}`)
})



