const fs = require("fs");
const helper = require("./helpers");

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

function createNewArticle(req, res, articlesArr) {
  console.log("create new article");

  helper.parseBodyJson(req, (err, bodyRequest) => {
    console.log(bodyRequest);

    const newArticle = {
      id: articlesArr.length + 1,
      title: bodyRequest.title || "default title",
      text: bodyRequest.text || "default text",
      date: bodyRequest.date || "default date",
      author: bodyRequest.author || "default title",
      comments: bodyRequest.comments || [],
    };

    const newArticlesArr = [...articlesArr, newArticle];
    helper.writeFileWithArticles(
      req,
      res,
      JSON.stringify(newArticlesArr),
      JSON.stringify(newArticle),
    );
  });
}

module.exports = {
  sum,
  pageNotFound,
  readAllArticles,
  readArticlesId,
  createNewArticle,
};
