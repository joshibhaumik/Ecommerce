const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

router.get("/failure", (req, res, next) => {
  res.statusCode = 200;
  res.end("Failed to login");
});

module.exports = router;
