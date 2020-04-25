const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res, next) => {
    res.statusCode = 200;
    res.send("/get to vegetables");
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.send("/post to vegetables with "+req.body);
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.send("warning deleting all vegetables");
})
.delete((req, res, next) => {
    res.statusCode = 200;
    res.send("warning deleting all vegetables");
});

router.route('/:vegetablesId')
.get((req, res, next) => {
    res.statusCode = 200;
    res.send("/get to vegetables with id "+req.params.vegetablesId);
})
.post((req, res, next) => {
    res.statusCode = 200;
    res.send("/post to vegetables with id "+req.params.vegetablesId+ " with "+ req.body);
})
.put((req, res, next) => {
    res.statusCode = 200;
    res.send("/put to vegetables with id "+req.params.vegetablesId);
})
.delete((req, res, next) => {
    res.statusCode = 200;
    res.send("/delete vegetables with id "+req.params.vegetablesId);
});

module.exports = router;