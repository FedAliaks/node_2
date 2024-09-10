const controller = require("./controllers");

const handlersURL = {
  "/sum": controller.sum,
  "/api/articles/readall": controller.readAllArticles,
  "/api/articles/read": controller.readArticlesId,
  "/api/articles/create": controller.createNewArticle,
  "/api/articles/update": controller.updateArticle,
  "/api/articles/delete": controller.deleteArticle,
  '/api/comments/create': controller.createComment,
  '/api/comments/delete': controller.deleteComment
};

function getHandler(url) {
  return handlersURL[url] || controller.pageNotFound;
}

module.exports = {
  getHandler,
};
