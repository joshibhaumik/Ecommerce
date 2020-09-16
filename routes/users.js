const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/users");

const router = express.Router();
router.use(bodyParser.json());

/*
  @route /api/users/
  @desc CRUD operations for all the users
*/
router
  .route("/")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Return all the Users" });
  })
  .post((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "User created" });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not allowed");
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: "Delete all the users" });
  });

/*
  @route /api/users/login
  @desc user login using google OAuth 2.0
*/

router.get("/login", (req, res, next) => {
  res.statusCode = 200;
  res.json({ message: "Login route" });
});

/*
  @route /api/users/userId
  @desc CRUD operation for a user
*/
router
  .route("/:userId")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: `User with User Id = ${req.params.userId}` });
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported");
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.json({
      message: `Update the User with User Id = ${req.params.userId}`
    });
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.json({ message: `User with user id = ${req.params.userId} deleted` });
  });

module.exports = router;
