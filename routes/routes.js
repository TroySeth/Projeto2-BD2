const router = require('express').Router();

const noteController = require('../controllers/noteController');

router.route('/notes').post((req, res) => noteController.create(req, res));

module.exports = router;