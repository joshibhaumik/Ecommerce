const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const Fruits = require("../models/fruits");

router.use(bodyParser.json());

router
  .route("/")
  .get((req, res, next) => {
    Fruits.find({})
      .then(
        fruits => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.send(fruits);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    Fruits.create(req.body)
      .then(
        fruit => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.send(fruit);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /fruits");
  })
  .delete((req, res, next) => {
    Fruits.remove({})
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

router
  .route("/:fruitsId")
  .get((req, res, next) => {
    Fruits.findById(req.params.fruitsId)
      .then(fruit => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(fruit);
      },e=>next(e))
      .catch(e => next(e));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /fruits/" + req.params.fruitsId);
  })
  .put((req, res, next) => {
    Fruits.findByIdAndUpdate(
      req.params.fruitsId,
      {
        $set: req.body
      },
      { new: true }
    ).then(fruit=> {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(fruit);
    },e=>next(e))
    .catch(e => next(e));
  })
  .delete((req, res, next) => {
    Fruits.findByIdAndRemove(req.params.fruitsId)
        .then(
          resp => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
  });

module.exports = router;