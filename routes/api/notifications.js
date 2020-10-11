const express = require("express");
const bodyParser = require("body-parser");
const auth = require("../../authenticate");
const Notifications = require("../../models/Notifications");
const Users = require("../../models/Users");
const Items = require("../../models/Items");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/notifications/
  @desc CRUD operations for all the notifications
*/
router
  .route("/")
  .get(auth.verifyUser, auth.validateAdmin, async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const notifications = await Notifications.find({});
      res.status(200).json({ status: true, payload: notifications, error: "" });
    } catch (error) {
      res.status(500).json({ status: false, payload: {}, error: error });
    }
  })
  .post(auth.verifyUser, async (req, res) => {
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
        const body = {
          userFrom: req.user._id,
          userTo: item.user,
          item: item._id,
          itemName: item.name,
          userFromDisplayName: req.user.displayName,
          userFromEmail: req.user.email || req.body.email,
          price: req.body.price,
          quantity: req.body.quantity,
          message: req.body.message
        };
        const notification = await Notifications.create(body);
        res.status(200).json({
          status: true,
          payload: notification,
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
  })
  .put(auth.verifyUser, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(501).json({
      status: false,
      payload: [],
      error: "PUT operation is not allowed."
    });
  })
  .delete(auth.verifyUser, auth.validateAdmin, async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const notifications = await Notifications.remove({});
      const users = await User.find({});
      for (let user of users) {
        user.notifications = [];
      }
      res.status(200).json({
        status: true,
        payload: notifications,
        error: ""
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        payload: [],
        error: error
      });
    }
  });

/*
  @route /api/notifications/notificationID
  @desc CRUD operations for a notification
*/

router
  .route("/:notificationId")
  .get(auth.verifyUser, async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const notification = await Notifications.findById(
        req.params.notificationId
      );
      if (notification === null) {
        res.status(404).json({
          status: false,
          payload: [],
          error: "Notification Does Not Exists."
        });
      } else {
        res.status(200).json({
          status: true,
          payload: notification,
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
  })
  .post(auth.verifyUser, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(501).json({
      status: false,
      payload: [],
      error: "POST operation is not allowed."
    });
  })
  .put(auth.verifyUser, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 501;
    res.json({
      status: false,
      payload: [],
      error: "You can't modify an application"
    });
  })
  .delete(auth.verifyUser, async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const user = await Users.findById(req.user._id);
      const notification = await Notifications.findById(
        req.params.notificationId
      );
      if (notification === null) {
        res.status(404).json({
          status: false,
          payload: [],
          error: "Notifications does not exists."
        });
      } else if (user.notifications.includes(req.params.notificationId)) {
        user.notifications.pull(req.params.notificationId);
        await user.save();
        res.status(200).json({
          status: true,
          payload: notification,
          error: ""
        });
      } else {
        res.status(403).json({
          status: false,
          payload: [],
          error: "you can't delete other people's notification"
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

module.exports = router;
