const fs = require("fs");
const path = require("path");
const handler = require("./handlers");
const log = require("npmlog");

function parseBodyJson(req, cb) {
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = body.join("").toString();
      const params = JSON.parse(body);
      cb(null, params);
    });
}

function writeFileWithArticles(req, res, body, answerRes) {
  const pathFile = path.join(__dirname, "articles.json");
  const writeStream = fs.createWriteStream("./articles.json");

  writeStream.write(body);
  writeStream.close();
  res.end(answerRes || "end response");
}

function requestError(req, res) {
  log.info("ERROR", "Request invalid", { url: req.url, date: new Date() });
  res.statusCode = 400;
  res.end("request invalid");
}

function validationRequest(url, articleArr, paramsObj) {
  switch (url) {
    case "/api/articles/read":
    case "/api/comments/create":
    case "/api/articles/update":
    case "/api/articles/delete":
      return paramsObj.articleId && paramsObj.articleId <= articleArr.length;
      break;
    case "/api/comments/delete":
      return (
        paramsObj.articleId &&
        paramsObj.articleId <= articleArr.length &&
        paramsObj.commentId &&
        paramsObj.commentId <= articleArr[articleId].length
      );
      break;
    default:
      return true;
  }
}

module.exports = {
  parseBodyJson,
  writeFileWithArticles,
  requestError,
  validationRequest,
};
