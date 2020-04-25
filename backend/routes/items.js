var express = require('express');
var router = express.Router();
const fruitesRouter = require('./fruits');
const vegetablesRouter = require('./vegetables');
const groceryRouter = require('./grocery');
const electronicsRouter = require('./electronics');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/fruits', fruitesRouter);
router.use('/vegetables', vegetablesRouter);
router.use('/grocery', groceryRouter);
router.use('/electronics', electronicsRouter);

module.exports = router;