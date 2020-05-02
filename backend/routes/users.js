var express = require("express");
var router = express.Router();
var passport = require("passport");

const bodyParser = require("body-parser");
var User = require("../models/user");
var authenticate = require("../authenticate");

router.use(bodyParser.json());

/* GET users listing. */
router.get(authenticate.verifyUser, authenticate.verifyAdmin, "/", function(req, res, next) {
  User.find({})
  .then(users => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.send(users);
  },e=>next(e))
  .catch(e=>next(e));
});

router.post("/signup", (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ status: true, message: "Registration Successful!" });
          });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    status: true,
    token: token,
    message: "You are successfully logged in!"
  });
});

router.post(authenticate.verifyUser, "/create-store", (req, res, next) => {
  if (req.user.hasStore) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "application/json");
    res.end({ message: "You have already created the store", status: false });
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          hasStore: true
        }
      },
      { new: true }
    )
      .then(
        user => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end({ message: "Created Store Successfully", status: true });
        },
        e => next(e)
      )
      .catch(e > next(e));
  }
});

router.route('/store')
.get(authenticate.verifyUser, (req, res, next) => {
  
})
.post(authenticate.verifyUser, (req, res, next) => {
  User.findById(req.user._id)
  .then(user => {
    user.store.push(req.body);
    user.save()
    .then(user=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send({data: user, message: null, status: true});
    }, e=>next(e))
    .catch(e=>next(e));
  },e=>next(e))
  .catch(e=>next(e));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'application/json');
  res.send({message:"PUT method is not allowed on /store", status:false});
})
.delete(authenticate.verifyUser, (req, res, next) => {
  User.findById(req.user._id)
  .then(user => {
    user.store = [];
    user.hasStore = false;
    user.save()
    .then(user => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send({message:"Your Store has been deleted successfully", status:true});
    },e=>next(e))
    .catch(e=>next(e));
  },e=>next(e))
  .catch(e=>next(e));
});

router.route('/store/itemId')
.get(authenticate.verifyUser)
.post()
.put()
.delete();

module.exports = router;
