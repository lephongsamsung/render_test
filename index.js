import express from "express";
import fetch from "node-fetch";

const app = express();

const SUPABASE_URL = "https://czdmkwjbfljmfijaulor.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// ✅ Route 1: Lấy chi tiết theo id
app.get("/proxy", async (req, res) => {
  const { table, id } = req.query;

  if (!table) return res.status(400).json({ error: "Missing table" });
  if (!id) return res.status(400).json({ error: "Missing id" });

  const apiUrl = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`;

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

// ✅ Route 2: Lấy toàn bộ danh sách (list all)
app.get("/proxy/list", async (req, res) => {
  const { table } = req.query;

  if (!table) return res.status(400).json({ error: "Missing table" });

  const apiUrl = `${SUPABASE_URL}/rest/v1/${table}`;

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

// ✅ Port Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
