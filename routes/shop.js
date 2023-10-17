const express = require('express');

const router = express.Router();

const shopControler = require('../controllers/shop');

router.get('/', shopControler.getProducts);

router.get('/product-list', shopControler.showAllProducts);

router.get('/products/:productID', shopControler.getProductDetails);

router.get('/cart', shopControler.getCart);

router.post('/cart', shopControler.postCart);

router.get('/checkout', shopControler.getCheckout);

router.get('/orders', shopControler.getOrders);

module.exports = router;
