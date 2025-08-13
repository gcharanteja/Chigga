import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const OPENROUTER_API = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY; // from Render env vars

app.post('/chat', async (req, res) => {
  try {
    // req.body will contain whatever model/messages/etc you send
    const r = await fetch(OPENROUTER_API, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await r.json();
    res.status(r.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
});

app.get('/', (req, res) => {
  res.send("Flexible AI Proxy is running.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
