const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/Users");
const Items = require("../models/Items");
const Store = require("../models/Stores");
const Comments = require("../models/Comments");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/users/
  @desc CRUD operations for all the users
*/
router
  .route("/")
  .get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let users = await User.find({});
      res.json({ status: true, payload: users, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .post(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let user = await User.create(req.body);
      res.json({ status: true, payload: user, error: "" });
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
      let users = await User.remove({});
      let stores = await Store.remove({});
      let items = await Items.remove({});
      let comments = await Comments.remove({});
      res.json({ status: true, payload: users, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

/*
  @route /api/users/userId
  @desc CRUD operation for a user
*/
router
  .route("/:userId")
  .get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let user = await User.findById(req.params.userId);
      if (user === null) {
        res.json({ status: false, payload: [], error: "User does not exists" });
      } else {
        res.json({ status: true, payload: user, error: "" });
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
    res.json({
      status: false,
      payload: {},
      error: "PUT operation not allowed for Google OAuth"
    });
  })
  .delete(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      const user = await User.findByIdAndRemove(req.params.userId);
      if (user === null) {
        res.json({ status: false, payload: [], error: "User does not exists" });
      } else {
        const store = await Store.findByIdAndRemove(user.store);
        if (store !== null) {
          const items_ = await Items.find({ store: store._id });
          if (items_.length !== 0) {
            for (let item of items_) {
              const comments = await Comments.remove({ item: item._id });
            }
            const items = await Items.remove({ store: store._id });
          }
        }
        res.json({ status: true, payload: user, error: "" });
      }
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

/*
  @route /api/users/cart/userId
  @desc add and remove an item from the user cart
*/
router.route("/cart/:userId")
.post(async (req, res, next) => {
  res.setHeader("Content-Type","application/json");
  res.statusCode = 200;
  try {
   const user = await User.findById(req.params.userId);
   const item = await Items.findById(req.body._id);
   if(user === null) {
    res.json({
      status:false,
      payload:[],
      error: "User does not exists"
    });
   } else if(item === null) {
    res.json({
      status:false,
      payload:[],
      error: "Item you are trying to add does not exists"
    });
   } else {
    user.cart.push(item);
    const succ = await user.save();
    res.json({
      status:true,
      payload:item,
      error:""
    });
   }
  } catch (error) {
    res.json({
      status:false,
      payload:[],
      error: error
    });
  }
})
.delete(async (req, res, next) => {
  res.setHeader("Content-Type","application/json");
  res.statusCode = 200;
  try {
    const user = await User.findById(req.params.userId);
    const item = await Items.findById(req.params._id);
    if(user === null) {
      res.json({
        status:false,
        payload:[],
        error: "User does not exists"
      });
    } else if(item === null) {
      res.json({
        status:false,
        payload:[],
        error: "Item you are trying to delete does not exists in the cart"
      });
    } else {
      user.cart.pull(item._id);
      const succ = await user.save();
      res.json({
        status:true,
        payload:item,
        error:""
      });
    }
  } catch (error) {
    res.json({
      status:false,
      payload:[],
      error: error
    });
  }
});

module.exports = router;
