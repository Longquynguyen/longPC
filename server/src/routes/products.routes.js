const express = require('express');
const router = express.Router();

const { authUser, authAdmin } = require('../auth/checkAuth');
const { asyncHandler } = require('../auth/checkAuth');

const controllerProducts = require('../controllers/products.controller');

router.post('/api/products', authAdmin, asyncHandler(controllerProducts.createProduct));

module.exports = router;
