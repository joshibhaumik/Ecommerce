const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/items/
  @desc CRUD operations for all the items
*/
router
  .route("/")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Return all the Items" });
  })
  .post((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Item Created" });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not allowed");
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Delete all the Items" });
  });

/*
  @route /api/items/itemId
  @desc CRUD operations for an Item
*/
router
  .route("/:itemId")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.json({
      message: `Get the Item with Item Id = ${req.params.itemId}`
    });
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported");
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: `Update Item with Item id = ${req.params.itemId}` });
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: `Delete Item with Item id = ${req.params.itemId}` });
  });

module.exports = router;
