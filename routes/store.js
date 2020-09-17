const express = require("express");
const bodyparser = require("body-parser");
const Store = require("../models/Stores");
const User = require("../models/Users");

const router = express.Router();
router.use(bodyparser.json());

/*
  @route /api/store/
  @desc CRUD operations for all the stores
*/
router
  .route("/")
  .get(async (req, res, next) => {
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
  .post(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {      
      let user = await User.findById(req.body.user);
      let store = await Store.create(req.body);
      if(user.store === undefined) {
        user.store = store._id;
        let succ = await user.save();
        res.json({ status: true, payload: store, error: "" });
      } else {
        res.json({ status: false, payload: [], error: "You already have a Store, please use that to sell Items" });
      }
    } catch (error) {
      res.json({ status: false, payload: [], error: error });
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
      let stores = await Store.remove({});
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
  .get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let store = await Store.findById(req.params.storeId);
      res.json({ status: true, payload: store, error: "" });
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
      let store = await Store.findByIdAndUpdate(
        req.params.storeId,
        { $set: req.body },
        { new: true }
      );
      res.json({ status: true, payload: store, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let store = await Store.findByIdAndRemove(req.params.storeId);
      res.json({ status: true, payload: store, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

module.exports = router;
