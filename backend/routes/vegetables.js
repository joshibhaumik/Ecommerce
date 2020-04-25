const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const Vegetables = require("../models/vegetables");

router.use(bodyParser.json());

router
  .route("/")
  .get((req, res, next) => {
    Vegetables.find({})
      .then(
        vegetables => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.send(vegetables);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    Vegetables.create(req.body)
      .then(
        vegetable => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.send(vegetable);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /vegetables");
  })
  .delete((req, res, next) => {
    Vegetables.remove({})
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
  .route("/:vegetableId")
  .get((req, res, next) => {
    Vegetables.findById(req.params.vegetableId)
      .then(vegetable => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(vegetable);
      },e=>next(e))
      .catch(e => next(e));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /vegetables/" + req.params.vegetableId);
  })
  .put((req, res, next) => {
    Vegetables.findByIdAndUpdate(
      req.params.vegetableId,
      {
        $set: req.body
      },
      { new: true }
    ).then(vegetable=> {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(vegetable);
    },e=>next(e))
    .catch(e => next(e));
  })
  .delete((req, res, next) => {
    Vegetables.findByIdAndRemove(req.params.vegetableId)
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