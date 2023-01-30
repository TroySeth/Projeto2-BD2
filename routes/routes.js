const router = require('express').Router();

const noteController = require('../controllers/noteController');

// Routes
router.route('/').get((req, res) => noteController.findAll(req, res));
router.route('/').post((req, res) => noteController.create(req, res));
router.route('/delete').post((req, res) => noteController.destroyNote(req, res));
router.route('/update').patch((req, res) => noteController.editNote(req, res));

module.exports = router;