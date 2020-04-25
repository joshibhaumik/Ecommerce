const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res, next) => {
    res.statusCode = 200;
    res.send("/get to grocery");
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.send("/post to grocery with "+req.body);
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.send("warning deleting all grocery");
})
.delete((req, res, next) => {
    res.statusCode = 200;
    res.send("warning deleting all grocery");
});

router.route('/:groceryId')
.get((req, res, next) => {
    res.statusCode = 200;
    res.send("/get to grocery with id "+req.params.groceryId);
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.send("/post to grocery with id "+req.params.groceryId+ " with "+ req.body);
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.send("/put to grocery with id "+req.params.groceryId);
})
.delete((req, res, next) => {
    res.statusCode = 200;
    res.send("/delete grocery with id "+req.params.groceryId);
});

module.exports = router;