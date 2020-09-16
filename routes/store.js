const express = require("express");
const bodyparser = require("body-parser");

const router = express.Router();
router.use(bodyparser.json());

/*
  @route /api/store/
  @desc CRUD operations for all the stores
*/
router
  .route("/")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Return all the stores" });
  })
  .post((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Store Created" });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not allowed");
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Delete all the Stores" });
  });

/*
  @route /api/store/storeId
  @desc CRUD operations for a store
*/
router
  .route("/:storeId")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.json({
      message: `Get the Store with Store Id = ${req.params.storeId}`
    });
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported");
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: `Update store with store id = ${req.params.storeId}` });
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: `Delete store with store id = ${req.params.storeId}` });
  });

module.exports = router;
