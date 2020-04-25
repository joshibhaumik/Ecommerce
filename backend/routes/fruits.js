const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res, next) => {
    res.statusCode = 200;
    res.send("/get to fruits");
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.send("/post to fruits with "+req.body);
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.send("put operation not allowed on /fruits");
})
.delete((req, res, next) => {
    res.statusCode = 200;
    res.send("warning deleting all fruits");
});

router.route('/:fruitsId')
.get((req, res, next) => {
    res.statusCode = 200;
    res.send("/get to fruits with id "+req.params.fruitsId);
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.send("/post to fruits with id "+req.params.fruitsId+ " with "+ req.body);
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.send("/put to fruits with id "+req.params.fruitsId);
})
.delete((req, res, next) => {
    res.statusCode = 200;
    res.send("/delete fruits with id "+req.params.fruitsId);
});

module.exports = router;