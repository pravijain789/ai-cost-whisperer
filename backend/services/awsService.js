const { CostExplorerClient, GetCostAndUsageCommand } = require('@aws-sdk/client-cost-explorer');

const USD_TO_INR = 85;

const client = new CostExplorerClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function getMonthlyCosts() {
  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const start = getLocalDateString(firstOfMonth);
  const end = getLocalDateString(today);

  const command = new GetCostAndUsageCommand({
    TimePeriod: { Start: start, End: end },
    Granularity: 'MONTHLY',
    Metrics: ['UnblendedCost'],
    GroupBy: [{ Type: 'DIMENSION', Key: 'SERVICE' }],
  });

  const response = await client.send(command);

  const results = response.ResultsByTime.map((period) => ({
    timePeriod: period.TimePeriod,
    services: period.Groups.map((group) => ({
      service: group.Keys[0],
      costUSD: Math.abs(parseFloat(group.Metrics.UnblendedCost.Amount)).toFixed(2),
      costINR: (Math.abs(parseFloat(group.Metrics.UnblendedCost.Amount)) * USD_TO_INR).toFixed(2),
    })),
  }));

  return results;
}

module.exports = { getMonthlyCosts };
