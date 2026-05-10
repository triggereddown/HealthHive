'use strict';
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'model'], required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [messageSchema],
    isComplete: { type: Boolean, default: false },
    diagnosis: {
      result: String,
      confidence: Number,
      description: String,
      recommendations: [String],
      severity: String,
      consultDoctorUrgency: String,
      summary: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);
