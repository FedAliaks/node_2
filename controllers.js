const fs = require('fs');




function sum (req, res, payload, cb) {
    const result = {
        c: payload.a + payload.b
    }

    cb(null, result)
}

function pageNotFound(req, res, payload, cb) {
    cb({code: 404, message: "Page not found"})
}

function readAllArticles(req, res) {
    const readableStream = fs.createReadStream('./articles.json');
    let body = []
    readableStream.on('data', (chunk) => {
        body.push(chunk)

    }).on('end', () => {
        body = body.join('').toString();
        res.end(JSON.stringify(body))
    })
}


module.exports = {
    sum,
    pageNotFound,
    readAllArticles
}