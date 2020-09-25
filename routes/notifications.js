const express = require("express");
const bodyParser = require("body-parser");
const auth = require("../authenticate");
const Notifications = require("../models/Notifications");
const Users = require("../models/Users");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/notifications/
  @desc CRUD operations for all the notifications
*/
router
  .route("/")
  .get(auth.verifyUser, auth.validateAdmin, (req, res, next) => {
    try {
      const notifications = Notifications.find({});
      res.json({ status: true, payload: notifications, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
    }
  })
  .post(auth.verifyUser, (req, res) => {
    try {
    } catch (error) {}
  })
  .put(auth.verifyUser, (req, res) => {
    try {
    } catch (error) {}
  })
  .delete(auth.verifyUser, (req, res) => {
    try {
    } catch (error) {}
  });

/*
  @route /api/notifications/notificationID
  @desc CRUD operations for a notification
*/

router
  .route("/:notificationId")
  .get(auth.verifyUser, (req, res) => {
    try {
    } catch (error) {}
  })
  .post(auth.verifyUser, (req, res) => {
    try {
    } catch (error) {}
  })
  .put(auth.verifyUser, (req, res) => {
    try {
    } catch (error) {}
  })
  .delete(auth.verifyUser, (req, res) => {
    try {
    } catch (error) {}
  });

module.exports = router;
