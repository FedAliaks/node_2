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

    function readAllArticles(req, res, articlesArr) {
        res.end(JSON.stringify(articlesArr))
    }


module.exports = {
    sum,
    pageNotFound,
    readAllArticles
}