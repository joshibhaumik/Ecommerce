const express = require("express");
const bodyparser = require("body-parser");
const Store = require("../models/Stores");
const User = require("../models/Users");
const Items = require("../models/Items");
const Comments = require("../models/Comments");
const auth = require("../authenticate");

const router = express.Router();
router.use(bodyparser.json());

/*
  @route /api/store/
  @desc CRUD operations for all the stores
*/
router
  .route("/")
  .get(auth.verifyUser, auth.validateAdmin, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let stores = await Store.find({});
      res.json({ status: true, payload: stores, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .post(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let user = await User.findById(req.user._id);
      let store = await Store.create(req.body);
      if (user.store === undefined) {
        user.store = store._id;
        let succ = await user.save();
        res.json({ status: true, payload: store, error: "" });
      } else {
        res.json({
          status: false,
          payload: [],
          error: "You already have a Store, please use that to sell Items"
        });
      }
    } catch (error) {
      res.json({ status: false, payload: [], error: error });
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
      const stores = await Store.remove({});
      const items = await Items.remove({});
      const comments = await Comments.remove({});
      res.json({ status: true, payload: stores, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

/*
  @route /api/store/storeId
  @desc CRUD operations for a store
*/
router
  .route("/:storeId")
  .get(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let store = await Store.findById(req.params.storeId);
      if (store === null) {
        res.json({
          status: false,
          payload: [],
          error: "Store does not exists"
        });
      } else {
        res.json({ status: true, payload: store, error: "" });
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
        const user = await User.findById(req.body.user);
        if (user === null) {
          res.json({
            status: false,
            payload: [],
            error: "User does not exists"
          });
        } else {
          let store = await Store.findByIdAndUpdate(
            req.params.storeId,
            { $set: req.body },
            { new: true }
          );
          if (store === null) {
            res.json({
              status: false,
              payload: [],
              error: "Store does not exists"
            });
          } else {
            res.json({ status: true, payload: store, error: "" });
          }
        }
      } else {
        res.json({
          status: false,
          payload: [],
          error: "You cannot modify somebody's store."
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
      if (String(req.user.store) == String(req.params.storeId)) {
        const store = await Store.findByIdAndRemove(req.params.storeId);
        if (store === null) {
          res.json({
            status: false,
            payload: [],
            error: "Store does not exists"
          });
        } else {
          const user = await User.findOne({ store: store._id });
          user.store = undefined;
          const succ = await user.save();
          const items_ = await Items.find({ store: store._id });
          if (items_.length !== 0) {
            for (let item of items_) {
              const comment = await Comments.remove({ item: item._id });
            }
            const items = await Items.remove({ store: store._id });
          }
          res.json({ status: true, payload: store, error: "" });
        }
      } else {
        res.json({
          status: false,
          payload: [],
          error: "You cannot delete somebody's store"
        });
      }
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

module.exports = router;
