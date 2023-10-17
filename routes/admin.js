const express = require('express');

const router = express.Router();

const getAddProduct = require('../controllers/admin').getAddProduct;
const postAddProduct = require('../controllers/admin').postAddProduct;

const getAdminProducts = require('../controllers/admin').getAdminProducts;

router.get('/products', getAdminProducts);

router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

module.exports = router;
