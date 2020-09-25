const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../authenticate");

/*
  @route /api/users/login
  @desc user login using google OAuth 2.0
*/
router.get("/login", passport.authenticate("google", { scope: ["profile"] }));

/*
  @route /api/users/google
  @desc Google Auth Callback route
*/
router.get(
  "/google",
  passport.authenticate("google", { failureRedirect: "/failure" }),
  (req, res, next) => {
    res.redirect(301, "/api/users/current_user");
  }
);

/*
  @route /api/users/logout
  @desc To logout the user
*/
router.get("/logout", auth.verifyUser, (req, res, next) => {
  try {
    req.logOut();
    res.json({ status: true, payload: [], error: "" });
  } catch (error) {
    res.json({
      status: false,
      payload: [],
      error: "Error occured while logging out"
    });
  }
});

module.exports = router;
