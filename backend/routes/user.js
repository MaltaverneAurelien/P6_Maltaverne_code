const express = require('express');
const router = express.Router();

const passwordValidator = require('../middleware/passwordValidator');
const userCtrl = require('../controllers/user');
const limiter = require('../middleware/rateLimit');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', limiter.loginLimiter, userCtrl.login);

module.exports = router;