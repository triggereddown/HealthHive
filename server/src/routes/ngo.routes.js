const express = require('express');
const router = express.Router();
const { getNGOs } = require('../controllers/ngo.controller');

router.get('/', getNGOs);

module.exports = router;
