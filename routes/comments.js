const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/comments/
  @desc CRUD operations for all the comments
*/
router
  .route("/")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Return all the comments" });
  })
  .post((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Comment Added" });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not allowed");
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Delete all the Comments" });
  });

/*
  @route /api/comments/commentId
  @desc CRUD operations for a comment
*/
router
  .route("/:commentId")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.json({
      message: `Get the Comment with Comment Id = ${req.params.commentId}`
    });
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported");
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: `Update Comment with Comment id = ${req.params.commentId}` });
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: `Delete Comment with Comment id = ${req.params.commentId}` });
  });

  module.exports = router;