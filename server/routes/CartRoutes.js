const { Router } = require('express');
const { authenticateToken } = require('../middlewares/Authentication');
const router = new Router();
const cartController = require('../controllers/CartController');

router.post('/', authenticateToken, cartController.updateCart);
router.get('/', authenticateToken, cartController.getCart);

module.exports = router;