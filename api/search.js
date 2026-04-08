export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    
    let messages = body.messages;
    let finalText = "";
    
    for (let i = 0; i < 10; i++) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.VITE_ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({ ...body, messages })
      });
      
      const data = await response.json();
      
      const textBlocks = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
      if (textBlocks) finalText += textBlocks;
      
      if (data.stop_reason !== "tool_use") break;
      
      const toolUseBlocks = (data.content || []).filter(b => b.type === "tool_use");
      const toolResults = toolUseBlocks.map(b => ({ type: "tool_result", tool_use_id: b.id, content: "" }));
      
      messages = [
        ...messages,
        { role: "assistant", content: data.content },
        { role: "user", content: toolResults }
      ];
    }
    
    res.status(200).json({ text: finalText });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
