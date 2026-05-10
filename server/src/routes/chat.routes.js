'use strict';

const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { startConversation, sendMessage, getSessions } = require('../controllers/chat.controller');

// All chat routes require authentication
router.use(protect);

router.post('/start', startConversation);
router.post('/message', sendMessage);
router.get('/sessions', getSessions);

module.exports = router;
