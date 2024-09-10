const fs = require("fs");
const path = require("path");

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

module.exports = {
  parseBodyJson,
  writeFileWithArticles,
};
