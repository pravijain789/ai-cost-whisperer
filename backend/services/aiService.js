const Groq = require('groq-sdk');

async function getCostInsights(costData) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const services = costData[0]?.services || [];

  const activeServices = services
    .filter(s => parseFloat(s.costUSD) > 0)
    .sort((a, b) => parseFloat(b.costUSD) - parseFloat(a.costUSD));

  const totalUSD = activeServices
    .reduce((sum, s) => sum + parseFloat(s.costUSD), 0)
    .toFixed(2);

  const totalINR = (totalUSD * 85).toFixed(2);

  const serviceList = activeServices
    .map(s => `- ${s.service}: $${s.costUSD} (₹${s.costINR})`)
    .join('\n');

  const prompt = `You are a friendly AWS cost expert helping a beginner developer understand their AWS bill.

Here is their AWS cost data for this month:
Total spend: $${totalUSD} (₹${totalINR})

Breakdown by service:
${serviceList || '- No active charges this month'}

Please provide:
1. A simple 2-line summary of their overall spending
2. For the top 3 most expensive services — explain in plain English what that service does and why it costs money
3. Three specific, actionable tips to reduce their AWS costs
4. A friendly note on whether this spending looks normal for a developer project

Keep the tone friendly and simple. Avoid deep technical jargon. Use Indian Rupees (₹) alongside dollars where helpful.`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
}

module.exports = { getCostInsights };
