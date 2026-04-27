const NGO = require('../models/NGO');

/**
 * GET /api/ngos
 * Public endpoint - fetch all active NGOs with optional search
 */
const getNGOs = async (req, res, next) => {
  try {
    const { search, city, service } = req.query;
    const filter = { isActive: true };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (city) {
      filter['location.city'] = { $regex: city, $options: 'i' };
    }

    if (service) {
      filter.services = { $in: [new RegExp(service, 'i')] };
    }

    const ngos = await NGO.find(filter).sort({ name: 1 }).lean();

    res.status(200).json({
      success: true,
      count: ngos.length,
      data: { ngos },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNGOs };
