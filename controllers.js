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

function readArticlesId(rea, res, articlesArr, paramsObj) {
  const article = articlesArr.filter((item) => item.id == paramsObj.articleId);

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

function updateArticle(req, res, articleArr, paramsObj) {
  helper.parseBodyJson(req, (err, bodyRequest) => {
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
}

function createComment(req, res, articleArr, paramsObj) {
  console.log("create comment");
  console.log(paramsObj.commentId);
  console.log(paramsObj);

  helper.parseBodyJson(req, (err, bodyRequest) => {
    const id = paramsObj.commentId;

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

  res.end("create comment");
}

function deleteComment(req, res, articleArr, paramsObj) {
  console.log('delete')
  console.log(paramsObj)



  const arr = articleArr.map(article => {
    let currentIdComment = 1;
    console.log('here1')
    console.log(article.id + '   ' + paramsObj.articleId)
    if (article.id != paramsObj.articleId) return article;

    const updateArticle = article;
    updateArticle.comments = article.comments.filter(item => item.id != paramsObj.commentId)
    updateArticle.comments.forEach(item => {
      item.id = currentIdComment;
      currentIdComment++;
    })
    console.log(article.comments)
    console.log('here22222222')
    console.log(updateArticle.comments);
    return updateArticle;
  })
  console.log(arr)

  helper.writeFileWithArticles(req, res, JSON.stringify(arr), "delete comment");
}

module.exports = {
  sum,
  pageNotFound,
  readAllArticles,
  readArticlesId,
  createNewArticle,
  updateArticle,
  deleteArticle,
  createComment,
  deleteComment,
};
