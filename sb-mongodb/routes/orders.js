const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');

router.get('', ordersController.getOrders);
router.get('/:_id', ordersController.getOrder);
router.post('', ordersController.createOrder);
router.put('/:_id', ordersController.updateOrder);
router.delete('/:_id', ordersController.deleteOrder);

module.exports = router;
