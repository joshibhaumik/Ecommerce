const express = require("express");
const bodyParser = require("body-parser");
const User = require("../../models/Users");
const Items = require("../../models/Items");
const Store = require("../../models/Stores");
const Reviews = require("../../models/Reviews");
const auth = require("../../authenticate");
const Users = require("../../models/Users");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/users/current_user/
  @desc Get the current logged in user
*/
router.get("/current_user", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.user ? req.user._id : null;
  const user = await Users.findById(id);
  if (req.user) {
    res.status(200).json({
      status: true,
      payload: user,
      error: ""
    });
  } else {
    res.status(403).json({
      status: false,
      payload: [],
      error: ""
    });
  }
});

/*
  @route /api/users/
  @desc CRUD operations for all the users
*/
router
  .route("/")
  .get(auth.verifyUser, auth.validateAdmin, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      let users = await User.find({});
      res.status(200).json({ status: true, payload: users, error: "" });
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  })
  .post((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(501).json({
      status: false,
      payload: [],
      error:
        "You cannot create the user. Please signin with your Google account."
    });
  })
  .put((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(501).json({
      status: false,
      payload: {},
      error: "PUT operation not allowed"
    });
  })
  .delete(auth.verifyUser, auth.validateAdmin, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const users = await User.remove({});
      const stores = await Store.remove({});
      const items = await Items.remove({});
      const reviews = await Reviews.remove({});
      res.status(200).json({
        status: true,
        payload: { users, stores, items, reviews },
        error: ""
      });
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  });

/*
  @route /api/users/userId
  @desc CRUD operation for a user
*/
router
  .route("/:userId")
  .get(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const user = await User.findById(req.params.userId).populate("","displayName firstName lastName image store ");
      if (user === null) {
        res
          .status(404)
          .json({ status: false, payload: [], error: "User not found" });
      } else {
        res.status(200).json({ status: true, payload: user, error: "" });
      }
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  })
  .post(auth.verifyUser, (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(501).json({
      status: false,
      payload: {},
      error: "POST operation not allowed"
    });
  })
  .put(auth.verifyUser, (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.status(501).json({
      status: false,
      payload: {},
      error: "PUT operation not allowed for Google OAuth"
    });
  })
  .delete(auth.verifyUser, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      if (String(req.params.userId) === String(req.user._id)) {
        const user = await User.findByIdAndRemove(req.params.userId);
        if (user === null) {
          res.status(404).json({
            status: false,
            payload: [],
            error: "User not found"
          });
        } else {
          const store = await Store.findByIdAndRemove(user.store);
          if (store !== null) {
            const items_ = await Items.find({ store: store._id });
            if (items_.length !== 0) {
              for (let item of items_) {
                await Reviews.remove({ item: item._id });
              }
              await Items.remove({ store: store._id });
            }
          }
          res.status(200).json({ status: true, payload: user, error: "" });
        }
      } else {
        res.status(501).json({
          status: false,
          payload: [],
          error: "You cannot delete another person's account"
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  });

/*
  @route /api/users/userId/cart
  @desc add an item to the cart
*/
router.post("/:userId/cart/", auth.verifyUser, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const user = await User.findById(req.user._id);
    const item = await Items.findById(req.body.item);
    if (item === null) {
      req.status(404).json({
        status: false,
        payload: [],
        error: "Item does not exists."
      });
    } else {
      req.body.availableQuantities = item.quantity;
      user.cart.push(req.body);
      await user.save();
      res.status(200).json({
        status: true,
        payload: user,
        error: ""
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      payload: [],
      error: error
    });
  }
});

/*
  @route /api/users/userId/cart/cartId
  @desc remove an item from the cart
*/
router.delete(
  "/:userId/cart/:cartItemId",
  auth.verifyUser,
  async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const user = await User.findById(req.user._id);
      if (user.cart.id(req.params.cartItemId) !== null) {
        user.cart.id(req.params.cartItemId).remove();
        await user.save();
      }
      res.status(200).json({
        status: true,
        payload: user,
        error: ""
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        payload: [],
        error: error
      });
    }
  }
);

/*
  @route /api/users/userId/notification
  @desc Create notification
*/
router.post("/:userId/notifications/", auth.verifyUser, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const userFrom = await Users.findById(req.user._id);
    if (userFrom.email === undefined) {
      userFrom.email = req.body.email;
      await userFrom.save();
    }
    const item = await Items.findById(req.body.item);
    if (item === null) {
      res.status(404).json({
        status: false,
        payload: [],
        error: "Item does not exists"
      });
    } else {
      const store = await Store.findById(item.store);
      const body = {
        userFrom: req.user._id,
        userTo: store.user,
        item: item._id,
        itemName: item.name,
        userFromDisplayName: req.user.displayName,
        userFromEmail: req.user.email || req.body.email,
        price: req.body.price,
        quantity: req.body.quantity,
        message: req.body.message
      };
      const userTo = await Users.findById(store.user);
      userTo.notifications.push(body);
      await userTo.save();
      res.status(200).json({
        status: true,
        payload: [],
        error: ""
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      payload: [],
      error: error
    });
  }
});

/*
  @route /api/users/userId/notifications/notificationId
  @desc Delete a notification
*/
router.delete(
  "/:userId/notifications/:notificationsId",
  auth.verifyUser,
  async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const user = await User.findById(req.user._id);
      console.log()
      if (user.notifications.id(req.params.notificationsId) !== null) {
        user.notifications.id(req.params.notificationsId).remove();
        await user.save();
      }
      res.json({
        status: true,
        payload: user,
        error: ""
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        payload: [],
        error: error
      });
    }
  }
);

module.exports = router;
