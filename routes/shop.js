const express = require('express');

const router = express.Router();

const showAllProducts = require('../controllers/products').showAllProducts;

router.get('/', showAllProducts);

module.exports = router;
