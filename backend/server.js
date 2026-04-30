require('dotenv').config();
const express = require('express');
const cors = require('cors');
const costsRouter = require('./routes/costs');
const insightsRouter = require('./routes/insights');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

app.use('/api/costs', costsRouter);
app.use('/api/insights', insightsRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
