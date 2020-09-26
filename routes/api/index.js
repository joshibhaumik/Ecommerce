const express = require("express");
const storeRouter = require("./store");
const usersRouter = require("./users");
const itemsRouter = require("./items");
const reviewRouter = require("./review");
const notificationRouter = require("./notifications");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/store", storeRouter);
router.use("/items", itemsRouter);
router.use("/reviews", reviewRouter);
router.use("/notifications", notificationRouter);

module.exports = router;