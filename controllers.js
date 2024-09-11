const fs = require("fs");
const helper = require("./helpers");
const log = require("npmlog");

function sum(req, res, payload, cb) {
  log.info("INFO", "SUM", { url: req.url, date: new Date(), payload: payload });
  const result = {
    c: payload.a + payload.b,
  };

  cb(null, result);
}

function pageNotFound(req, res, payload, cb) {
  log.info("ERROR", "Page Not Found", { url: req.url, date: new Date() });
  cb({ code: 404, message: "Page not found" });
}

module.exports = {
  sum,
  pageNotFound,
};
