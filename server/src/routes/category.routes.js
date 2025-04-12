const express = require('express');
const router = express.Router();

const { authUser, authAdmin } = require('../auth/checkAuth');
const { asyncHandler } = require('../auth/checkAuth');

const controllerCategory = require('../controllers/category.controller');

router.post('/api/create-category', asyncHandler(controllerCategory.createCategory));
router.get('/api/get-all-category', asyncHandler(controllerCategory.getAllCategory));
router.delete('/api/delete-category', asyncHandler(controllerCategory.deleteCategory));
router.post('/api/update-category', asyncHandler(controllerCategory.updateCategory));

module.exports = router;
