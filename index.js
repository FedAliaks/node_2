const http = require('http');
const helper = require('./helpers')
const handler = require('./handlers')
const fs = require('fs')

const port = 3000;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
    if (!req.url.startsWith('/api')) {
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

    } else {
        const [url, queryParams] = req.url.split('?')
        let articleId = null
        console.log(url)
        if(queryParams) {
            queryParams.split('&').forEach((item) => {
                const [key, value] = item.split('=');
                if (key == 'id') articleId = value;
            })
        }

        console.log('url');
        console.log(url);
        console.log('id');
        console.log(articleId)

        const readableStream = fs.createReadStream('./articles.json');
        const body = [];
        readableStream.on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            articlesArr = JSON.parse(body.join('').toString())
            console.log(articlesArr)
            const handlerURL = handler.getHandler(url)
            handlerURL(req, res, articlesArr, articleId)




        })













/*         const handlerURL = handler.getHandler(req.url)
        handlerURL(req, res) */

    }


});

server.listen(port, host, () => {
    console.log(`server is available at ${host}:${port}`)
})



