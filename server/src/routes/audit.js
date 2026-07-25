const express = require('express');
const { auditPage } = require('../services/pageAudit');

const router = express.Router();

async function handleAudit(url, res, next) {
  try {
    const report = await auditPage(url);
    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
}

router.post('/', async (req, res, next) => {
  await handleAudit(req.body?.url, res, next);
});

router.get('/', async (req, res, next) => {
  await handleAudit(req.query.url, res, next);
});

module.exports = router;