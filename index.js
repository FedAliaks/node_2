const http = require("http");
const helper = require("./helpers");
const handler = require("./handlers");
const fs = require("fs");
const log = require("npmlog");

const port = 3000;
const host = "127.0.0.1";

const server = http.createServer((req, res) => {
  if (!req.url.startsWith("/api")) {
    helper.parseBodyJson(req, (err, payload) => {
      const handlerURL = handler.getHandler(req.url);

      handlerURL(req, res, payload, (err, result) => {
        if (err) {
          res.statusCode = err.code;

          res.end(JSON.stringify(err));
          return;
        }
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      });
    });
  } else {
    const [url, queryParams] = req.url.split("?");
    paramsObj = {
      articleId: null,
      commentId: null,
    };

    if (queryParams) {
      queryParams.split("&").forEach((item) => {
        const [key, value] = item.split("=");
        if (key == "id") paramsObj.articleId = value;
        if (key == "articleId") paramsObj.articleId = value;
        if (key == "commentId") paramsObj.commentId = value;
      });
    }

    const readableStream = fs.createReadStream("./articles.json");
    const body = [];
    readableStream
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        articlesArr = JSON.parse(body.join("").toString());

        const handlerURL = handler.getHandler(url);

        helper.validationRequest(url, articlesArr, paramsObj)
          ? handlerURL(req, res, articlesArr, paramsObj)
          : helper.requestError(req, res);
      });
  }
});

server.listen(port, host, () => {
  log.info("INFO", "Server is available", {
    url: "127.0.1.0:3000",
    date: new Date(),
  });
});
