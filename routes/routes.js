const router = require('express').Router();

const noteController = require('../controllers/noteController');

router.route('/').get((req, res) => noteController.findAll(req, res));
router.route('/').post((req, res) => noteController.create(req, res));

module.exports = router;