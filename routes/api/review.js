const express = require("express");
const bodyParser = require("body-parser");
const Reviews = require("../../models/Reviews");
const Items = require("../../models/Items");
const User = require("../../models/Users");
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
    res.statusCode = 200;
    try {
      let reviews = await Reviews.find({});
      res.json({ status: true, payload: reviews, error: "" });
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
            const review_ = await Reviews.find({ user: req.body.user }).where(
              "item",
              req.body.item
            );
            if (review_.length > 0) {
              res.json({
                status: false,
                payload: [],
                error: "You're not allowed to rate an item more then once"
              });
            } else {
              const review = await Reviews.create(req.body);
              item.reviews.push(review);
              if (item.rating === -1) {
                item.rating = review.rating;
              } else {
                item.rating =
                  (item.rating * (item.reviews.length - 1) + review.rating) /
                  item.reviews.length;
              }
              const succ = await item.save();
              res.json({ status: true, payload: review, error: "" });
            }
          }
        }
      } else {
        res.json({
          status: false,
          payload: [],
          error: "You cannot add review on other people's behalf"
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
      let reviews = await Reviews.remove({});
      res.json({ status: true, payload: reviews, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
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
    res.statusCode = 200;
    try {
      let review = await Reviews.findById(req.params.reviewId);
      if (review === null) {
        res.json({
          status: false,
          payload: [],
          error: "Review does not exists"
        });
      } else {
        res.json({ status: true, payload: review, error: "" });
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
          const review = await Reviews.findByIdAndUpdate(
            req.params.reviewId,
            { $set: req.body },
            { new: true }
          );
          if (review === null) {
            res.json({
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
            res.json({ status: true, payload: review, error: "" });
          }
        }
      } else {
        res.json({
          status: false,
          payload: [],
          error: "You cannot modify review on other people's behalf"
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
      let review = await Reviews.findByIdAndRemove(req.params.reviewId);
      if (review === null) {
        res.json({
          status: false,
          payload: [],
          error: "Review does not exists"
        });
      } else {
        if (String(req.user._id) === String(review.user)) {
          let item = await Items.findById(review.item);
          item.rating =
            (item.rating * item.reviews.length - review.rating) /
            (item.reviews.length - 1);
          item.reviews.pull(String(review._id));
          let succ = await item.save();
          res.json({ status: true, payload: review, error: "" });
        } else {
          res.json({
            status: false,
            payload: [],
            error: "You cannot delete somebody's review"
          });
        }
      }
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

module.exports = router;
