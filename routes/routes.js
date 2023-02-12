const router = require('express').Router();

const noteController = require('../controllers/noteController');
const userController = require('../controllers/userController');

// Route home
router.route('/').get((req, res) => {
    const username = req.session.user;
    if(username){
        res.render('partials/home/header', {layout: 'main', username: username.username});
    } else{
        res.render('partials/home/header', {layout: 'main'});
    }
});

// Routes notes
router.route('/notes').get((req, res) => noteController.findAll(req, res));
router.route('/create').post((req, res) => noteController.create(req, res));
router.route('/delete').post((req, res) => noteController.destroyNote(req, res));
router.route('/update').post((req, res) => noteController.editNote(req, res));
router.route('/busca').post((req, res) => noteController.findText(req, res));

// Routes users
router.route('/register').get((req, res) => res.render('partials/register/register', {layout:'register'}));
router.route('/createUser').post((req, res) => userController.create(req, res));
router.route('/signin').post((req, res) => userController.signin(req, res));
router.route('/signout').get((req, res) => userController.signout(req, res));

module.exports = router;