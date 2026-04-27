const express = require('express');
const router = express.Router();
const { register, login, refreshToken } = require('../controllers/auth.controller');
const { registerSchema, loginSchema, validate } = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refreshToken);

module.exports = router;
