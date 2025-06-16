const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "sd-..."; // Replace with your real API key

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json"
};

app.post("/api/ask", async (req, res) => {
  const userMessage = req.body.question;

  try {
    const completionRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // or "gpt-4" if you have access
        messages: [{ role: "user", content: userMessage }]
      },
      { headers }
    );

    const reply = completionRes.data.choices[0].message.content;
    res.json({ reply: reply || "No response from API." });
  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "OpenAI API error." });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
