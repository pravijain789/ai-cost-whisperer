const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  service: String,
  costUSD: String,
  costINR: String,
});

const costSnapshotSchema = new mongoose.Schema({
  fetchedAt: { type: Date, default: Date.now },
  timePeriod: {
    Start: String,
    End: String,
  },
  services: [serviceSchema],
});

module.exports = mongoose.model('CostSnapshot', costSnapshotSchema);
