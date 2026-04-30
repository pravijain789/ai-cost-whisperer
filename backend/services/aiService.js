const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getCostInsights(costData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = `
You are an AWS cost analyst. Analyse the following AWS cost data (in INR) and:
1. Summarise total spending
2. Highlight the most expensive services
3. Explain why these services might be costing money
4. Suggest 2-3 practical ways to reduce costs

AWS Cost Data:
${JSON.stringify(costData, null, 2)}

Keep your response clear, friendly, and under 200 words.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { getCostInsights };
