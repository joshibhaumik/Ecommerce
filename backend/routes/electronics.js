const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res, next) => {
    res.statusCode = 200;
    res.send("/get to electronics");
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.send("/post to electronics with "+req.body);
})
.put((req, res, next) => {
    res.statusCode = 500;
    res.send("put operation not supported");
})
.delete((req, res, next) => {
    res.statusCode = 200;
    res.send("warning deleting all electronics");
});

router.route('/:electronicsId')
.get((req, res, next) => {
    res.statusCode = 200;
    res.send("/get to electronics with id "+req.params.electronicsId);
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.send("/post to electronics with id "+req.params.electronicsId+ " with "+ req.body);
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.send("/put to electronics with id "+req.params.electronicsId);
})
.delete((req, res, next) => {
    res.statusCode = 200;
    res.send("/delete electronics with id "+req.params.electronicsId);
});

module.exports = router;