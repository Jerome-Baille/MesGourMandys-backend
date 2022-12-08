const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const productCtrl = require('../controllers/product');

router.post(    '/new',         multer,   productCtrl.createProduct);
router.get(     '/:id',                         productCtrl.getOneProduct);
router.get(     '/sku/:sku',                    productCtrl.getProductBySku);
router.put(     '/:id',         auth, multer,   productCtrl.modifyProduct);
router.delete(  '/:id',         auth, multer,   productCtrl.deleteProduct);
router.get(     '/',                            productCtrl.getAllProducts);

module.exports = router;