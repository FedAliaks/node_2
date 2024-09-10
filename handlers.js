const controller = require("./controllers");

const handlersURL = {
  "/sum": controller.sum,
  "/api/articles/readall": controller.readAllArticles,
  "/api/articles/read": controller.readArticlesId,
  "/api/articles/create": controller.createNewArticle,
};

function getHandler(url) {
  return handlersURL[url] || controller.pageNotFound;
}

module.exports = {
  getHandler,
};
