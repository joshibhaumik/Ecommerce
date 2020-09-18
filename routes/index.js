const express = require("express");
const router = express.Router();

router.get("/", (req,res,next) => {
    res.statusCode = 200;
    res.send("Welcome to online store");
});

router.get("/failure", (req,res,next) => {
    res.statusCode = 200;
    res.end("Failed to login");
});

module.exports = router;