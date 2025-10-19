import express from "express";
import fetch from "node-fetch";

const app = express();

const SUPABASE_URL = "https://czdmkwjbfljmfijaulor.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY;

app.get("/proxy", async (req, res) => {
  const { table, id } = req.query;

  if (!table) return res.status(400).json({ error: "Missing table" });

  const apiUrl = `${SUPABASE_URL}/rest/v1/${table}${
    id ? `?id=eq.${id}` : ""
  }`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy Error", detail: error.message });
  }
});

app.listen(10000, () => console.log("Server started on port 10000"));
