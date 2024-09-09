const controller = require('./controllers')


const handlersURL = {
    '/sum': controller.sum,
    '/api/articles/readall': controller.readAllArticles
}

function getHandler(url) {
    return handlersURL[url] || controller.pageNotFound
}


module.exports = {
    getHandler
}
