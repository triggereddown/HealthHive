const express = require('express');
const router = express.Router();
const { getMe } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth');

router.get('/me', protect, getMe);

module.exports = router;
