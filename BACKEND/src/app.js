const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();

// More flexible CORS for development + Vercel previews
const allowedOrigins = [
  'https://goodwork-nine.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // Allow requests with no origin (Postman, etc.)
  if (allowedOrigins.includes(origin)) return true;
  // Allow any Vercel preview/production domain
  if (origin.endsWith('.vercel.app')) return true;
  return false;
};

app.use(cors({
  origin: function(origin, callback) {
    if (!isAllowedOrigin(origin)) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('Backend is live!'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

module.exports = app;
