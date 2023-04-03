const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/forgot_password', require('./forgot_password'));

console.log('Router is working');

module.exports = router;