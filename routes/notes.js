const router = require('express').Router();

const serviceController = require('../controllers/noteController');

// Funções
router.route('/notes').post((req, res) => noteController.create(req, res));

module.exports = router;