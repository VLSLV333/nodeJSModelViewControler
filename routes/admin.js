const express = require('express');

const router = express.Router();

const getAddProduct = require('../controllers/products').getAddProduct;
const postAddProduct = require('../controllers/products').postAddProduct;

router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

module.exports = router;
