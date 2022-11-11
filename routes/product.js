const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product');

router.post(    '/new',            productCtrl.createProduct);
router.get(     '/:id',         productCtrl.getOneProduct);
router.get(     '/sku/:sku',    productCtrl.getProductBySku);
router.put(     '/:id',         productCtrl.modifyProduct);
router.delete(  '/:id',         productCtrl.deleteProduct);
router.get(     '/',            productCtrl.getAllProducts);

module.exports = router;