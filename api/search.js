export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const prompt = body.prompt;

    let messages = [{ role: "user", content: prompt }];
    let finalText = "";

    for (let i = 0; i < 10; i++) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-opus-4-6",
          max_tokens: 2000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages
        })
      });

      const data = await response.json();

      if (data.error) {
        console.log("Anthropic error:", JSON.stringify(data.error));
        throw new Error(data.error.message);
      }

      const textBlocks = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
      if (textBlocks) finalText += textBlocks;

      if (data.stop_reason !== "tool_use") break;

      const toolUseBlocks = (data.content || []).filter(b => b.type === "tool_use");
      const toolResults = toolUseBlocks.map(b => ({
        type: "tool_result",
        tool_use_id: b.id,
        content: ""
      }));

      messages = [
        ...messages,
        { role: "assistant", content: data.content },
        { role: "user", content: toolResults }
      ];
    }

    console.log("final text length:", finalText.length);
    res.status(200).json({ text: finalText });
  } catch (e) {
    console.log("error:", e.message);
    res.status(500).json({ error: e.message });
  }
}
