const express = require("express");
const bodyParser = require("body-parser");
const Reviews = require("../../models/Reviews");
const Items = require("../../models/Items");
const User = require("../../models/Users");
const Store = require("../../models/Stores");
const auth = require("../../authenticate");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/reviews/
  @desc CRUD operations for all the reviews
*/
router
  .route("/")
  .get(auth.verifyUser, auth.validateAdmin, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const reviews = await Reviews.find({});
      res.status(200).json({ status: true, payload: reviews, error: "" });
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  })
  .post(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const user = await User.findById(req.user._id);
      const item = await Items.findById(req.body.item);
      if (item === null) {
        res.status(404).json({
          status: false,
          payload: [],
          error: "Item does not exists"
        });
      } else {
        const body = req.body;
        body["user"] = user._id;
        const review = await Reviews.create(body);
        item.reviews.push(review._id);
        if (item.rating === -1) {
          item.rating = review.rating;
        } else {
          item.rating =
            (item.rating * item.reviews.length + review.rating) /
            (item.reviews.length + 1);
        }
        await item.save();
        res.status(201).json({ status: true, payload: review, error: "" });
      }
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  })
  .put(auth.verifyUser, (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 501;
    res.json({
      status: false,
      payload: {},
      error: "PUT operation not allowed"
    });
  })
  .delete(auth.verifyUser, auth.validateAdmin, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const reviews = await Reviews.remove({});
      const items = await Items.find({});
      for (let item of items) {
        item.reviews = [];
      }
      res.status(200).json({ status: true, payload: reviews, error: "" });
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  });

/*
  @route /api/reviews/reviewId
  @desc CRUD operations for a review
*/
router
  .route("/:reviewId")
  .get(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const review = await Reviews.findById(req.params.reviewId);
      if (review === null) {
        res.status(404).json({
          status: false,
          payload: [],
          error: "Review does not exists"
        });
      } else {
        res.status(200).json({ status: true, payload: review, error: "" });
      }
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  })
  .post(auth.verifyUser, (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 501;
    res.json({
      status: false,
      payload: {},
      error: "POST operation not allowed"
    });
  })
  .put(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      if (String(req.user._id) === String(req.body.user)) {
        const user = User.findById(req.body.user);
        const item = await Items.findById(req.body.item);
        if (user === null) {
          res.status(404).json({
            status: false,
            payload: [],
            error: "User does not exists"
          });
        } else if (item === null) {
          res.status(404).json({
            status: false,
            payload: [],
            error: "Item does not exists"
          });
        } else {
          const review = await Reviews.findByIdAndUpdate(
            req.params.reviewId,
            { $set: req.body },
            { new: true }
          );
          if (review === null) {
            res.status(404).json({
              status: false,
              payload: [],
              error: "Review does not exists"
            });
          } else {
            item.rating =
              (item.rating * item.reviews.length -
                review_.rating +
                review.rating) /
              item.reviews.length;
            const succ = await item.save();
            res.status(200).json({ status: true, payload: review, error: "" });
          }
        }
      } else {
        res.status(403).json({
          status: false,
          payload: [],
          error: "You cannot modify review on other people's behalf"
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  })
  .delete(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let review = await Reviews.findByIdAndRemove(req.params.reviewId);
      if (review === null) {
        res.status(400).json({
          status: false,
          payload: [],
          error: "Review does not exists"
        });
      } else {
        if (String(req.user._id) === String(review.user)) {
          let item = await Items.findById(review.item);
          if(item.reviews.length === 0) {
            item.rating = 0;
          } else {
            item.rating =
              ((item.rating * item.reviews.length) - review.rating) /
              (item.reviews.length - 1);
          }
          item.reviews.pull(review._id);
          await item.save();
          res.status(200).json({ status: true, payload: review, error: "" });
        } else {
          res.status(403).json({
            status: false,
            payload: [],
            error: "You cannot delete somebody's review"
          });
        }
      }
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  });

module.exports = router;
