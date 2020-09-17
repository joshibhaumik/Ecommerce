const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/Users");

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
      res.json({ status: true, payload: user, error: "" });
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
      let user = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: req.body },
        { new: true }
      );
      res.json({ status: true, payload: user, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    try {
      let user = await User.findByIdAndRemove(req.params.userId);
      res.json({ status: true, payload: user, error: "" });
    } catch (error) {
      res.json({ status: false, payload: {}, error: error });
      next(error);
    }
  });

/*
  @route /api/users/login
  @desc user login using google OAuth 2.0
*/
router.get("/login", (req, res, next) => {
  res.statusCode = 200;
  res.json({ message: "Login route" });
});

router.get('/google',()=> {

});

/*
  @route /api/users/logout
  @desc To logout the user
*/
router.get("/logout", (req, res, next) => {
  res.statusCode = 200;
  res.json({ message: "Logged out" });
});

module.exports = router;
