require('dotenv').config();

const express = require('express');
const cors = require('cors');
const auditRouter = require('./routes/audit');

const app = express();

app.disable('x-powered-by');

app.use(cors({
  origin: process.env.CLIENT_ORIGIN
}));

app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'page-pulse',
  });
});

app.use('/api/audit', auditRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  });
});

app.use((err, req, res, next) => {
  if (err.message === 'CORS blocked') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'CORS_FORBIDDEN',
        message: 'Origin not allowed by CORS',
      },
    });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Request body must be valid JSON',
      },
    });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: {
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Request body is too large',
      },
    });
  }

  const statusCode = err.statusCode || err.status || 500;

  if (statusCode >= 500) {
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Unexpected server error',
      ...(err.hint ? { hint: err.hint } : {}),
    },
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Page Pulse API running on http://localhost:${port}`);
});