require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateSummary(data){

  const prompt = `
Analyze this sales dataset and generate an executive summary.

Dataset sample:
${JSON.stringify(data.slice(0,20))}

Include:
- key insights
- trends
- recommendations
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-8b-instant"
  });

  return completion.choices[0].message.content;
}

module.exports = generateSummary;