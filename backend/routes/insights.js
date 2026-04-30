const express = require('express');
const router = express.Router();
const { getMonthlyCosts } = require('../services/awsService');
const { getCostInsights } = require('../services/aiService');

router.get('/', async (req, res) => {
  try {
    const costs = await getMonthlyCosts();
    const insights = await getCostInsights(costs);
    res.json({ success: true, insights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
