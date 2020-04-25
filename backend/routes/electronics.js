const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const Electronics = require("../models/electronics");

router.use(bodyParser.json());

router
  .route("/")
  .get((req, res, next) => {
    Electronics.find({})
      .then(
        electronics => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.send(electronics);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    Electronics.create(req.body)
      .then(
        ele => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.send(ele);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /electronics");
  })
  .delete((req, res, next) => {
    Electronics.remove({})
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
  .route("/:electronicsId")
  .get((req, res, next) => {
    Electronics.findById(req.params.electronicsId)
      .then(ele => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(ele);
      },e=>next(e))
      .catch(e => next(e));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /electronics/" + req.params.electronicsId);
  })
  .put((req, res, next) => {
    Electronics.findByIdAndUpdate(
      req.params.electronicsId,
      {
        $set: req.body
      },
      { new: true }
    ).then(ele=> {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(ele);
    },e=>next(e))
    .catch(e => next(e));
  })
  .delete((req, res, next) => {
    Electronics.findByIdAndRemove(req.params.electronicsId)
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