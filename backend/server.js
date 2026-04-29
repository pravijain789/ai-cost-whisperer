require('dotenv').config();
const express = require('express');
const cors = require('cors');
const costsRouter = require('./routes/costs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

app.use('/api/costs', costsRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
