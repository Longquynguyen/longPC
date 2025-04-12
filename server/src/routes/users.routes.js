const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/users.controller');
const { authUser, authAdmin } = require('../auth/checkAuth');
const { asyncHandler } = require('../auth/checkAuth');

router.post('/api/register', asyncHandler(controllerUser.registerUser));
router.post('/api/login', asyncHandler(controllerUser.loginUser));

module.exports = router;
