const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

const connect = require("./connectToDB");

dotenv.config({ path: "config.env" });

connect();

const storeRouter = require("./routes/store");
const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/items");
const commentRouter = require("./routes/comments");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/store", storeRouter);
app.use("/api/users", usersRouter);
app.use("/api/items", itemsRouter);
app.use("/api/comments", commentRouter);

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
  res.send("Error Encountered!");
});

module.exports = app;
