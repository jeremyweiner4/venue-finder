export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.anthropic_key,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 2000,
        messages: body.messages
      })
    });

    const data = await response.json();
    console.log("status:", response.status, "error:", data.error, "content length:", (data.content||[]).length);
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
    res.status(200).json({ text });
  } catch (e) {
    console.log("error:", e.message);
    res.status(500).json({ error: e.message });
  }
}
