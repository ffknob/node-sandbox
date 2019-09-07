const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.get('', productsController.getProducts);
router.get('/:_id', productsController.getProduct);
router.post('', productsController.createProduct);
router.put('/:_id', productsController.updateProduct);
router.delete('/:_id', productsController.deleteProduct);

module.exports = router;
