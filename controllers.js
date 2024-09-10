const fs = require("fs");

function sum(req, res, payload, cb) {
  const result = {
    c: payload.a + payload.b,
  };

  cb(null, result);
}

function pageNotFound(req, res, payload, cb) {
  cb({ code: 404, message: "Page not found" });
}

function readAllArticles(req, res, articlesArr) {
  res.end(JSON.stringify(articlesArr));
}

function readArticlesId(rea, res, articlesArr, id) {
  const article = articlesArr.filter((item) => item.id == id);

  article.length > 0
    ? res.end(JSON.stringify(article[0]))
    : res.end("ID article have not found");
}

module.exports = {
  sum,
  pageNotFound,
  readAllArticles,
  readArticlesId,
};
