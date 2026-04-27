const Joi = require('joi');

const predictSchema = Joi.object({
  symptoms: Joi.array()
    .items(Joi.string().trim().min(2))
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one symptom is required',
      'any.required': 'Symptoms are required',
    }),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message).join(', ');
    return res.status(400).json({ success: false, message: messages });
  }
  next();
};

module.exports = { predictSchema, validate };
