const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/failure", (req, res, next) => {
  res.status(301).redirect("http://localhost:3000/error/failed");
});

module.exports = router;
