const express = require("express");
const bodyParser = require("body-parser");
const Comments = require("../models/Comments");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/comments/
  @desc CRUD operations for all the comments
*/
router
  .route("/")
  .get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let comments = await Comments.find({});
      res.json({ status: true, payload: comments, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .post(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let comment = await Comments.create(req.body);
      res.json({ status: true, payload: comment, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .put((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json({
      status: false,
      payload: {},
      error: "PUT operation not allowed"
    });
  })
  .delete(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let comments = await Comments.remove({});
      res.json({ status: true, payload: comments, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

/*
  @route /api/comments/commentId
  @desc CRUD operations for a comment
*/
router
  .route("/:commentId")
  .get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let comment = await Comments.findById(req.params.commentId);
      res.json({ status: true, payload: comment, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .post((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json({
      status: false,
      payload: {},
      error: "POST operation not allowed"
    });
  })
  .put(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let comment = await Comments.findByIdAndUpdate(
        req.params.commentId,
        { $set: req.body },
        { new: true }
      );
      res.json({ status: true, payload: comment, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let comment = await Comments.findByIdAndRemove(req.params.commentId);
      res.json({ status: true, payload: comment, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

module.exports = router;
