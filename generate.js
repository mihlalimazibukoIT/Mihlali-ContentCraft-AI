// Vercel serverless function: /api/generate
// Keeps your Gemini API key on the server (as an environment variable)
// so visitors can use the app without pasting a key of their own.

const MODEL = "gemini-2.5-flash";
const MAX_INPUT_CHARS = 8000;   // longest request we accept
const MAX_OUTPUT_TOKENS = 2048; // longest reply we allow

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: { message: "Use POST." } });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(503).json({ error: { message: "The server has no API key set. Add your own key in Settings." } });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body;
  const system = body && typeof body.system === "string" ? body.system : "";
  const userText = body && typeof body.userText === "string" ? body.userText : "";

  if (!userText) {
    return res.status(400).json({ error: { message: "Missing request text." } });
  }
  if (system.length + userText.length > MAX_INPUT_CHARS) {
    return res.status(413).json({ error: { message: "That request is too long. Please shorten it." } });
  }

  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent";
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: userText }] }],
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          thinkingConfig: { thinkingBudget: 0 }
        }
      })
    });
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (e) {
    return res.status(502).json({ error: { message: "Could not reach the AI service. Try again." } });
  }
};

function safeParse(text) {
  try { return JSON.parse(text); } catch (e) { return null; }
}
