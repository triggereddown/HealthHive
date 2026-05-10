'use strict';

const Conversation = require('../models/Conversation');
const Prediction = require('../models/Prediction');
const { sendChatMessage } = require('../services/chat.service');

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/chat/start
// Creates a new conversation and processes the first user message.
// ──────────────────────────────────────────────────────────────────────────────
const startConversation = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const userMessage = message.trim();

    // Call Gemini with empty history (first message)
    const aiReply = await sendChatMessage([], userMessage);

    // Create conversation record
    const conversation = await Conversation.create({
      userId: req.user._id,
      messages: [
        { role: 'user', content: userMessage },
        { role: 'model', content: aiReply.content },
      ],
      isComplete: aiReply.type === 'diagnosis',
      diagnosis: aiReply.type === 'diagnosis' ? aiReply.diagnosis : undefined,
    });

    // If diagnosis was immediate (e.g., emergency), also create a Prediction record
    if (aiReply.type === 'diagnosis' && aiReply.diagnosis) {
      await Prediction.create({
        userId: req.user._id,
        symptoms: [userMessage],
        result: aiReply.diagnosis.result,
        confidence: aiReply.diagnosis.confidence,
        description: aiReply.diagnosis.description,
        recommendations: aiReply.diagnosis.recommendations,
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        sessionId: conversation._id,
        message: aiReply.content,
        isComplete: conversation.isComplete,
        diagnosis: conversation.isComplete ? aiReply.diagnosis : null,
        messageCount: 1,
      },
    });
  } catch (error) {
    console.error('❌ Chat start error:', error.message);
    next(error);
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/chat/message
// Continues an existing conversation.
// ──────────────────────────────────────────────────────────────────────────────
const sendMessage = async (req, res, next) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'sessionId is required.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    // Load conversation
    const conversation = await Conversation.findOne({
      _id: sessionId,
      userId: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found.' });
    }

    if (conversation.isComplete) {
      return res.status(400).json({
        success: false,
        message: 'This consultation is already complete. Please start a new one.',
      });
    }

    const userMessage = message.trim();

    // Call Gemini with existing history (history = all messages BEFORE this one)
    const aiReply = await sendChatMessage(conversation.messages, userMessage);

    // Append user message and AI reply to history
    conversation.messages.push({ role: 'user', content: userMessage });
    conversation.messages.push({ role: 'model', content: aiReply.content });

    if (aiReply.type === 'diagnosis' && aiReply.diagnosis) {
      conversation.isComplete = true;
      conversation.diagnosis = aiReply.diagnosis;

      // Extract all user messages as symptom context
      const userMessages = conversation.messages
        .filter((m) => m.role === 'user')
        .map((m) => m.content);

      // Persist as a Prediction record so it shows up in history
      await Prediction.create({
        userId: req.user._id,
        symptoms: userMessages,
        result: aiReply.diagnosis.result,
        confidence: aiReply.diagnosis.confidence,
        description: aiReply.diagnosis.description,
        recommendations: aiReply.diagnosis.recommendations,
      });
    }

    await conversation.save();

    return res.status(200).json({
      success: true,
      data: {
        sessionId: conversation._id,
        message: aiReply.content,
        isComplete: conversation.isComplete,
        diagnosis: conversation.isComplete ? aiReply.diagnosis : null,
        messageCount: Math.floor(conversation.messages.length / 2),
      },
    });
  } catch (error) {
    console.error('❌ Chat message error:', error.message);
    next(error);
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/chat/sessions
// Returns the user's past conversation sessions.
// ──────────────────────────────────────────────────────────────────────────────
const getSessions = async (req, res, next) => {
  try {
    const sessions = await Conversation.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('isComplete diagnosis.result diagnosis.severity createdAt messages')
      .lean();

    const formatted = sessions.map((s) => ({
      id: s._id,
      isComplete: s.isComplete,
      result: s.diagnosis?.result || null,
      severity: s.diagnosis?.severity || null,
      messageCount: Math.floor((s.messages?.length || 0) / 2),
      createdAt: s.createdAt,
    }));

    return res.status(200).json({ success: true, data: { sessions: formatted } });
  } catch (error) {
    next(error);
  }
};

module.exports = { startConversation, sendMessage, getSessions };
