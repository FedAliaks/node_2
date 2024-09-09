




function sum (req, res, payload, cb) {
    const result = {
        c: payload.a + payload.b
    }

    cb(null, result)
}

function pageNotFound(req, res, payload, cb) {
    cb({code: 404, message: "Page not found"})
}


module.exports = {
    sum,
    pageNotFound
}