let express = require("express");
let router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "this is an items API" });
});

module.exports = router;
