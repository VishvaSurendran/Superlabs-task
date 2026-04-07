const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.search);
router.get('/:sku', productController.getDetail);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.put('/:id', productController.update);

module.exports = router;