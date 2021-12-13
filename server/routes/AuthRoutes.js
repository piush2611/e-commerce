const { Router } = require('express');
const router = new Router();
const authController = require('../controllers/AuthController');
const { authenticateToken } = require('../middlewares/Authentication');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.put('/', authenticateToken, authController.updateUser);

module.exports = router;