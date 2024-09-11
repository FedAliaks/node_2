const controller = require("./controllers");
const controllerAPI = require("./controllersAPI");

const handlersURL = {
  "/sum": controller.sum,
  "/api/articles/readall": controllerAPI.readAllArticles,
  "/api/articles/read": controllerAPI.readArticlesId,
  "/api/articles/create": controllerAPI.createNewArticle,
  "/api/articles/update": controllerAPI.updateArticle,
  "/api/articles/delete": controllerAPI.deleteArticle,
  "/api/comments/create": controllerAPI.createComment,
  "/api/comments/delete": controllerAPI.deleteComment,
};

function getHandler(url) {
  return handlersURL[url] || controller.pageNotFound;
}

module.exports = {
  getHandler,
};
