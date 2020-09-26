const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const connect = require("./connectToDB");
const auth = require("./authenticate");

const apiRouter = require("./routes/api/index");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/authentication");

dotenv.config({ path: "config.env" });

// Authenticate
auth.validateGoogle(passport);

connect();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'online store',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection : mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/", indexRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
