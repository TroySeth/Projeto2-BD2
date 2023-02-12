const router = require('express').Router();

const noteController = require('../controllers/noteController');
const userController = require('../controllers/userController');

// Routes note
router.route('/').get((req, res) => noteController.findAll(req, res));
router.route('/').post((req, res) => noteController.create(req, res));
router.route('/delete').post((req, res) => noteController.destroyNote(req, res));
router.route('/update').post((req, res) => noteController.editNote(req, res));
router.route('/busca').post((req, res) => noteController.findText(req, res));

// Routes user
router.route('/register').post((req, res) => userController.create(req, res));

module.exports = router;