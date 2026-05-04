require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { getMonthlyCosts } = require('./services/awsService');
const CostSnapshot = require('./models/CostSnapshot');
const costsRouter = require('./routes/costs');
const insightsRouter = require('./routes/insights');
const errorHandler = require('./middleware/errorHandler');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

app.use('/api/costs', costsRouter);
app.use('/api/insights', insightsRouter);
app.use(errorHandler);

cron.schedule('0 0 * * *', async () => {
  try {
    const costs = await getMonthlyCosts();
    for (const period of costs) {
      await CostSnapshot.create({
        timePeriod: period.timePeriod,
        services: period.services,
      });
    }
    console.log('Scheduled cost fetch completed');
  } catch (err) {
    console.error('Scheduled fetch failed:', err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
