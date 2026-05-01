const express = require('express');
const router = express.Router();
const { getMonthlyCosts } = require('../services/awsService');
const CostSnapshot = require('../models/CostSnapshot');

router.get('/', async (req, res) => {
  try {
    const costs = await getMonthlyCosts();

    for (const period of costs) {
      await CostSnapshot.create({
        timePeriod: period.timePeriod,
        services: period.services,
      });
    }

    res.json({ success: true, data: costs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
