import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/openrouterProxy", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error");
  }
});

// Vercel port ortam değişkeni
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy listening on port ${port}`);
});
