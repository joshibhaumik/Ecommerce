const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const Grocery = require("../models/grocery");

router.use(bodyParser.json());

router
  .route("/")
  .get((req, res, next) => {
    Grocery.find({})
      .then(
        grocery => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.send(grocery);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    Grocery.create(req.body)
      .then(
        grocery => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.send(grocery);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /grocery");
  })
  .delete((req, res, next) => {
    Grocery.remove({})
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
  .route("/:groceryId")
  .get((req, res, next) => {
    Grocery.findById(req.params.groceryId)
      .then(grocery => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(grocery);
      },e=>next(e))
      .catch(e => next(e));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /grocery/" + req.params.groceryId);
  })
  .put((req, res, next) => {
    Grocery.findByIdAndUpdate(
      req.params.groceryId,
      {
        $set: req.body
      },
      { new: true }
    ).then(grocery => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(grocery);
    },e=>next(e))
    .catch(e => next(e));
  })
  .delete((req, res, next) => {
    Grocery.findByIdAndRemove(req.params.groceryId)
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