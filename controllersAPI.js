const fs = require("fs");
const helper = require("./helpers");
const log = require("npmlog");

function readAllArticles(req, res, articlesArr) {
  log.info("INFO", "Read all articles", { url: req.url, date: new Date() });
  res.end(JSON.stringify(articlesArr));
}

function readArticlesId(req, res, articlesArr, paramsObj) {
  log.info("INFO", "Read article Id", { url: req.url, date: new Date() });
  const article = articlesArr.filter((item) => item.id == paramsObj.articleId);

  article.length > 0
    ? res.end(JSON.stringify(article[0]))
    : res.end("ID article have not found");
}

function createNewArticle(req, res, articlesArr) {
  helper.parseBodyJson(req, (err, bodyRequest) => {
    const newArticle = {
      id: articlesArr.length + 1,
      title: bodyRequest.title || "default title",
      text: bodyRequest.text || "default text",
      date: bodyRequest.date || "default date",
      author: bodyRequest.author || "default title",
      comments: bodyRequest.comments || [],
    };

    log.info("INFO", "Add new article", {
      url: req.url,
      date: new Date(),
      payload: newArticle,
    });

    const newArticlesArr = [...articlesArr, newArticle];
    helper.writeFileWithArticles(
      req,
      res,
      JSON.stringify(newArticlesArr),
      JSON.stringify(newArticle),
    );
  });
}

function updateArticle(req, res, articleArr, paramsObj) {
  helper.parseBodyJson(req, (err, bodyRequest) => {
    log.info("INFO", "update Article", {
      url: req.url,
      date: new Date(),
      payload: bodyRequest,
    });
    const arr = articleArr.map((item) =>
      item.id != paramsObj.articleId
        ? item
        : {
            id: item.id,
            title: bodyRequest.title || item.title,
            text: bodyRequest.text || item.text,
            date: bodyRequest.date || item.date,
            author: bodyRequest.author || item.author,
            comments: item.comments,
          },
    );

    helper.writeFileWithArticles(
      req,
      res,
      JSON.stringify(arr),
      "article has updated",
    );
  });

  res.end("update article");
}

function deleteArticle(req, res, articleArr, paramsObj) {
  let currentNewId = 1;

  const arr = articleArr
    .filter((item) => item.id != paramsObj.articleId)
    .map((item) => {
      return {
        id: currentNewId++,
        title: item.title,
        text: item.text,
        date: item.date,
        author: item.author,
        comments: item.comments,
      };
    });

  helper.writeFileWithArticles(req, res, JSON.stringify(arr), "delete article");
  log.info("INFO", "delete article", { url: req.url, date: new Date() });
}

function createComment(req, res, articleArr, paramsObj) {
  helper.parseBodyJson(req, (err, bodyRequest) => {
    log.info("INFO", "create comment", {
      url: req.url,
      date: new Date(),
      payload: bodyRequest,
    });
    const id = paramsObj.articleId;

    let newComment;
    const arr = articleArr.map((item) => {
      if (item.id == id) {
        newComment = {
          id: item.comments.length + 1,
          articleId: item.id,
          text: bodyRequest.text || "default comment",
          date: bodyRequest.text || "default comment",
          author: bodyRequest.text || "default comment",
        };

        return {
          id: item.id,
          title: item.title,
          text: item.text,
          date: item.date,
          author: item.author,
          comments: [...item.comments, newComment],
        };
      }
      return item;
    });

    helper.writeFileWithArticles(
      req,
      res,
      JSON.stringify(arr),
      JSON.stringify(newComment),
    );
  });
}

function deleteComment(req, res, articleArr, paramsObj) {
  log.info("INFO", "delete comment", { url: req.url, date: new Date() });

  const arr = articleArr.map((article) => {
    let currentIdComment = 1;

    if (article.id != paramsObj.articleId) return article;

    const updateArticle = article;
    updateArticle.comments = article.comments.filter(
      (item) => item.id != paramsObj.commentId,
    );
    updateArticle.comments.forEach((item) => {
      item.id = currentIdComment;
      currentIdComment++;
    });

    return updateArticle;
  });

  helper.writeFileWithArticles(
    req,
    res,
    JSON.stringify(arr),
    "The comment has already deleted",
  );
}

module.exports = {
  readAllArticles,
  readArticlesId,
  createNewArticle,
  updateArticle,
  deleteArticle,
  createComment,
  deleteComment,
};
