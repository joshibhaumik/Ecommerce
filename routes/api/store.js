const express = require("express");
const bodyparser = require("body-parser");
const Store = require("../../models/Stores");
const User = require("../../models/Users");
const Items = require("../../models/Items");
const Reviews = require("../../models/Reviews");
const auth = require("../../authenticate");

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
    try {
      let stores = await Store.find({});
      res.status(200).json({ status: true, payload: stores, error: "" });
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  })
  .post(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const user = await User.findById(req.user._id);
      if (user.store === undefined) {
        const body = req.body;
        body["user"] = req.user._id;
        const store = await Store.create(body);
        user.store = store._id;
        await user.save();
        res.status(201).json({ status: true, payload: store, error: "" });
      } else {
        res.status(501).json({
          status: false,
          payload: [],
          error: "You already have a Store, please use that to sell Items"
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, payload: [], error: error });
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
      const stores = await Store.remove({});
      const items = await Items.remove({});
      const reviews = await Reviews.remove({});
      const users = await User.find({});
      for (let user of users) {
        user.store = undefined;
        user.notifications = [];
        user.cart = [];
      }
      res
        .status(200)
        .json({ status: true, payload: { stores, items, reviews }, error: "" });
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  });

/*
  @route /api/store/storeId
  @desc CRUD operations for a store
*/
router
  .route("/:storeId")
  .get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      let store = await Store.findById(req.params.storeId).populate("items");
      if (store === null) {
        res.status(404).json({
          status: false,
          payload: [],
          error: "Store does not exists"
        });
      } else {
        res.status(200).json({ status: true, payload: store, error: "" });
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
        const user = await User.findById(req.body.user);
        if (user === null) {
          res.status(404).json({
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
            res.status(404).json({
              status: false,
              payload: [],
              error: "Store does not exists"
            });
          } else {
            res.status(204).json({ status: true, payload: store, error: "" });
          }
        }
      } else {
        res.status(403).json({
          status: false,
          payload: [],
          error: "You cannot modify somebody's store."
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  })
  .delete(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      if (String(req.user.store) == String(req.params.storeId)) {
        const store = await Store.findByIdAndRemove(req.params.storeId);
        if (store === null) {
          res.status(404).json({
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
              const reviews = await Reviews.remove({ item: item._id });
            }
            const items = await Items.remove({ store: store._id });
          }
          res.status(200).json({ status: true, payload: store, error: "" });
        }
      } else {
        res.status(403).json({
          status: false,
          payload: [],
          error: "You cannot delete somebody's store"
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  });

module.exports = router;
