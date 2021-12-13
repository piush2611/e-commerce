const { Router } = require('express');
const router = new Router();
const orderController = require('../controllers/OrderController');
const { authenticateToken } = require('../middlewares/Authentication');

router.post('/', authenticateToken, orderController.placeOrder);
router.get('/:id', authenticateToken, orderController.getOrder);
router.get('/', authenticateToken, orderController.getAll);

module.exports = router;