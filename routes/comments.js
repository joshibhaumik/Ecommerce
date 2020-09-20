const express = require("express");
const bodyParser = require("body-parser");
const Comments = require("../models/Comments");
const Items = require("../models/Items");
const User = require("../models/Users");
const auth = require("../authenticate");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/comments/
  @desc CRUD operations for all the comments
*/
router
  .route("/")
  .get(auth.verifyUser, auth.validateAdmin, async (req, res, next) => {
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
  .post(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      if (String(req.user._id) === String(req.body.user)) {
        const item = await Items.findById(req.body.item);
        const user = await User.findById(req.body.user);
        if (user === null) {
          res.json({
            status: false,
            payload: [],
            error: "User does not exists"
          });
        } else {
          if (item === null) {
            res.json({
              status: false,
              payload: [],
              error: "Item does not exists"
            });
          } else {
            const comment_ = await Comments.find({ user: req.body.user }).where(
              "item",
              req.body.item
            );
            if (comment_.length > 0) {
              res.json({
                status: false,
                payload: [],
                error: "You're not allowed to rate an item more then once"
              });
            } else {
              const comment = await Comments.create(req.body);
              item.comments.push(comment);
              if (item.rating === -1) {
                item.rating = comment.rating;
              } else {
                item.rating =
                  (item.rating * (item.comments.length - 1) + comment.rating) /
                  item.comments.length;
              }
              const succ = await item.save();
              res.json({ status: true, payload: comment, error: "" });
            }
          }
        }
      } else {
        res.json({
          status: false,
          payload: [],
          error: "You cannot add comment on other people's behalf"
        });
      }
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .put(auth.verifyUser, (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json({
      status: false,
      payload: {},
      error: "PUT operation not allowed"
    });
  })
  .delete(auth.verifyUser, auth.validateAdmin, async (req, res, next) => {
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
  .get(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let comment = await Comments.findById(req.params.commentId);
      if (comment === null) {
        res.json({
          status: false,
          payload: [],
          error: "Comment does not exists"
        });
      } else {
        res.json({ status: true, payload: comment, error: "" });
      }
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .post(auth.verifyUser, (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json({
      status: false,
      payload: {},
      error: "POST operation not allowed"
    });
  })
  .put(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      if (String(req.user._id) === String(req.body.user)) {
        const user = User.findById(req.body.user);
        const item = await Items.findById(req.body.item);
        if (user === null) {
          res.json({
            status: false,
            payload: [],
            error: "User does not exists"
          });
        } else if (item === null) {
          res.json({
            status: false,
            payload: [],
            error: "Item does not exists"
          });
        } else {
          const comment = await Comments.findByIdAndUpdate(
            req.params.commentId,
            { $set: req.body },
            { new: true }
          );
          if (comment === null) {
            res.json({
              status: false,
              payload: [],
              error: "Comment does not exists"
            });
          } else {
            item.rating =
              (item.rating * item.comments.length -
                comment_.rating +
                comment.rating) /
              item.comments.length;
            const succ = await item.save();
            res.json({ status: true, payload: comment, error: "" });
          }
        }
      } else {
        res.json({
          status: false,
          payload: [],
          error: "You cannot modify comment on other people's behalf"
        });
      }
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .delete(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let comment = await Comments.findByIdAndRemove(req.params.commentId);
      if (comment === null) {
        res.json({
          status: false,
          payload: [],
          error: "Comment does not exists"
        });
      } else {
        if (String(req.user._id) === String(comment.user)) {
          let item = await Items.findById(comment.item);
          item.rating =
            (item.rating * item.comments.length - comment.rating) /
            (item.comments.length - 1);
          item.comments.pull(String(comment._id));
          let succ = await item.save();
          res.json({ status: true, payload: comment, error: "" });
        } else {
          res.json({
            status: false,
            payload: [],
            error: "You cannot delete somebody's comment"
          });
        }
      }
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

module.exports = router;
