const express = require('express');
const router = express.Router();
const { predict, getHistory } = require('../controllers/prediction.controller');
const { protect } = require('../middlewares/auth');
const { predictSchema, validate } = require('../validators/predict.validator');

router.post('/', protect, validate(predictSchema), predict);
router.get('/history', protect, getHistory);

module.exports = router;
