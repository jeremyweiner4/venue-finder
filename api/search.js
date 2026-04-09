export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { prompt, useSearch = true } = body;

    let messages = [{ role: "user", content: prompt }];
    let finalText = "";

    const requestBody = {
      model: useSearch ? "claude-sonnet-4-6" : "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages,
    };

    if (useSearch) {
      requestBody.tools = [{ type: "web_search_20250305", name: "web_search" }];
    }

    for (let i = 0; i < 10; i++) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({ ...requestBody, messages })
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
