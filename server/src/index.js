require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const predictionRoutes = require('./routes/prediction.routes');
const ngoRoutes = require('./routes/ngo.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();

// ─── Security & Utilities ────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL === '*'
    ? '*'
    : (process.env.CLIENT_URL || 'http://localhost:5173'),
  credentials: process.env.CLIENT_URL !== '*',
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Rate Limiting ────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts. Please try again in 15 minutes.' },
});

app.use('/api/', globalLimiter);
app.use('/api/auth/', authLimiter);

// ─── Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/predict', predictionRoutes);
app.use('/api/ngos', ngoRoutes);

// Chat (conversational AI) — dedicated rate limiter to protect Gemini quota
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 8,
  message: { success: false, message: 'Too many messages. Please wait a moment.' },
});
app.use('/api/chat', chatLimiter);
app.use('/api/chat', chatRoutes);

// ─── Health Check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ComCare API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ─────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ─── Centralized Error Handler ────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Auto-seed NGOs on startup
  try {
    const NGO = require('./models/NGO');
    const count = await NGO.countDocuments();
    if (count === 0) {
      const seedNGOs = require('./utils/seedNGOs');
      await seedNGOs();
    }
  } catch (e) {
    console.warn('⚠️  NGO seed check failed:', e.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 ComCare Server running on http://localhost:${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  });
};

startServer();

module.exports = app;
