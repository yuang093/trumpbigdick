// 檔案路徑: api/gemini.js

export default async function handler(req, res) {
  // 1. 從 Vercel 環境變數中讀取你的 Gemini API Key (千萬不要直接寫在這裡)
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server Configuration Error: API Key missing" });
  }

  // 2. 接收前端傳來的提示詞 (Prompt)
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  try {
    // 3. 向 Google Gemini 發送請求
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    
    // 4. 將結果回傳給前端
    return res.status(200).json(data);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Failed to fetch from Gemini" });
  }
}