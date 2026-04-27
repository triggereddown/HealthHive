const Prediction = require('../models/Prediction');
const { runPrediction } = require('../services/prediction.service');

/**
 * POST /api/predict
 */
const predict = async (req, res, next) => {
  try {
    const { symptoms } = req.body;

    const predictionResult = runPrediction(symptoms);

    const prediction = await Prediction.create({
      userId: req.user._id,
      symptoms,
      result: predictionResult.result,
      confidence: predictionResult.confidence,
      description: predictionResult.description,
      recommendations: predictionResult.recommendations,
    });

    res.status(200).json({
      success: true,
      message: 'Prediction complete.',
      data: {
        id: prediction._id,
        symptoms: prediction.symptoms,
        result: prediction.result,
        confidence: prediction.confidence,
        description: prediction.description,
        recommendations: prediction.recommendations,
        createdAt: prediction.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/predict/history
 */
const getHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [predictions, total] = await Promise.all([
      Prediction.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Prediction.countDocuments({ userId: req.user._id }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        predictions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { predict, getHistory };
