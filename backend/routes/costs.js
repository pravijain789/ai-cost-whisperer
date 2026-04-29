const express = require('express');
const router = express.Router();
const { getMonthlyCosts } = require('../services/awsService');

router.get('/', async (req, res) => {
  try {
    const costs = await getMonthlyCosts();
    res.json({ success: true, data: costs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
