const controller = require('./controllers')


const handlersURL = {
    '/sum': controller.sum
}

function getHandler(url) {
    return handlersURL[url] || controller.pageNotFound
}


module.exports = {
    getHandler
}
