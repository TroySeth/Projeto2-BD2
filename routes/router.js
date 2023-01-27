const router = require('express').Router();

// Services router
const servicesRouter = require('./notes');

router.use('/', servicesRouter);

module.exports = router;