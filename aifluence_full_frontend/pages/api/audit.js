import { Configuration, OpenAIApi } from 'openai';
import fetch from 'node-fetch';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const page = await fetch(url);
    const html = await page.text();

    const prompt = \`
You are a web audit AI helping sites become more visible to LLMs like ChatGPT and Perplexity.
Analyze this site: \${url}

Return:
- llmReadable (true/false)
- schemaMarkupPresent (true/false)
- contentClarityScore (0-10)
- recommendations (array of strings)

HTML: \${html.slice(0, 8000)}
\`;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    });

    const text = response.data.choices[0].message.content;
    let audit;
    try {
      audit = JSON.parse(text);
    } catch {
      return res.status(200).json({ warning: "Invalid JSON", raw: text });
    }

    res.status(200).json({ audit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Audit failed', message: err.message });
  }
}