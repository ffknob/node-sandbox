const express = require('express');
const router = express.Router();

const cartsController = require('../controllers/carts');

router.get('', cartsController.getCarts);
router.get('/:_id', cartsController.getCart);
router.post('', cartsController.createCart);
router.put('/:_id', cartsController.updateCart);
router.delete('/:_id', cartsController.deleteCart);

module.exports = router;
