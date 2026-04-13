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
      model: "claude-sonnet-4-6",
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
    
    // Extract JSON array from response
    const start = finalText.indexOf("[");
    const end = finalText.lastIndexOf("]");
    let jsonStr = start !== -1 && end !== -1 ? finalText.slice(start, end + 1) : finalText;
    
    // Attempt to parse and repair JSON
    let parsed = null;
    
    // Attempt 1: direct parse
    try { parsed = JSON.parse(jsonStr); } catch(e) {}
    
    // Attempt 2: clean control chars and trailing commas
    if (!parsed) {
      try {
        const c = jsonStr
          .replace(/[\u0000-\u001F\u007F]/g, " ")
          .replace(/,(\s*[}\]])/g, "$1")
          .replace(/([^\\])'/g, "$1\\'");
        parsed = JSON.parse(c);
      } catch(e) {}
    }
    
    // Attempt 3: fix unescaped apostrophes/quotes inside strings
    if (!parsed) {
      try {
        // Replace smart quotes with straight quotes
        const c = jsonStr
          .replace(/[\u2018\u2019]/g, "'")
          .replace(/[\u201C\u201D]/g, '"')
          .replace(/[\u0000-\u001F\u007F]/g, " ")
          .replace(/,(\s*[}\]])/g, "$1");
        parsed = JSON.parse(c);
      } catch(e) {}
    }

    // Attempt 4: extract individual venue objects
    if (!parsed) {
      try {
        const objects = [];
        let depth = 0, objStart = -1;
        for (let i = 0; i < jsonStr.length; i++) {
          if (jsonStr[i] === "{") { if (depth === 0) objStart = i; depth++; }
          else if (jsonStr[i] === "}") { depth--; if (depth === 0 && objStart !== -1) { try { objects.push(JSON.parse(jsonStr.slice(objStart, i + 1))); } catch(e) {} } }
        }
        if (objects.length > 0) parsed = objects;
      } catch(e) {}
    }

    if (parsed) {
      res.status(200).json({ text: JSON.stringify(parsed) });
    } else {
      res.status(200).json({ text: finalText });
    }
  } catch (e) {
    console.log("error:", e.message);
    res.status(500).json({ error: e.message });
  }
}
