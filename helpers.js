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

module.exports = {
  parseBodyJson,
};
