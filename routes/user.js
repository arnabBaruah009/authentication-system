const express = require('express');
const router = express.Router();
const passport = require('passport');

//acquire the controller
const userController = require('../controllers/user_controller');

//set the routes
router.get('/home', passport.checkAuthentication, userController.home);
router.get('/signIn', userController.signIn);
router.get('/signUp', userController.signUp);
router.get('/signOut', userController.destroySession);
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signIn'}
) , userController.createSession);

module.exports = router;
