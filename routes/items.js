const express = require("express");
const bodyParser = require("body-parser");
const Items = require("../models/Items");
const Store = require("../models/Stores");
const Comments = require("../models/Comments");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/items/
  @desc CRUD operations for all the items
*/
router
  .route("/")
  .get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let items = await Items.find({});
      res.json({ status: true, payload: items, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .post(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let store = await Store.findById(req.body.store);
      if (store === null) {
        res.json({
          status: false,
          payload: [],
          error: "Store does not exists"
        });
      } else {
        let item = await Items.create(req.body);
        store.items.push(item);
        let succ = await store.save();
        res.json({ status: true, payload: item, error: "" });
      }
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
      let items = await Items.remove({});
      let comments = await Comments.remove({});
      res.json({ status: true, payload: items, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

/*
  @route /api/items/itemId
  @desc CRUD operations for an Item
*/
router
  .route("/:itemId")
  .get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let item = await Items.findById(req.params.itemId);
      if (item === null) {
        res.json({ status: false, payload: [], error: "Item does not exists" });
      } else {
        res.json({ status: true, payload: item, error: "" });
      }
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
      let store = await Store.findById(req.body.store);
      if(store === null) {
        res.json({status:false, payload:[], error:"Store does not exists"});
      } else {
        let item = await Items.findByIdAndUpdate(
          req.params.itemId,
          { $set: req.body },
          { new: true }
        );
        if(item === null) {
          res.json({ status: false, payload: [], error: "Item does not exists" });
        } else {
          res.json({ status: true, payload: item, error: "" });
        }
      }
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      const item = await Items.findByIdAndRemove(req.params.itemId);
      if (item === null) {
        res.json({ status: false, payload: [], error: "Item does not exists" });
      } else {
        const comments = await Comments.remove({ item: item._id });
        const store = await Store.findById(item.store);
        store.items.pull(String(item._id));
        const succ = await store.save();
        res.json({ status: true, payload: item, error: "" });
      }
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

module.exports = router;
