import express from "express";
import fetch from "node-fetch";

const app = express();
const SUPABASE_URL = "https://czdmkwjbfljmfijaulor.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// ✅ Route 1: Chi tiết theo ID
app.get("/proxy", async (req, res) => {
  const { table, id } = req.query;
  if (!table || !id)
    return res.status(400).json({ error: "Missing table or id" });

  const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`;
  try {
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Route 2: Lấy danh sách tất cả (crypto_news)
app.get("/proxy/list", async (req, res) => {
  const { table = "crypto_news", limit = 10 } = req.query;
  const url = `${SUPABASE_URL}/rest/v1/${table}?limit=${limit}`;
  try {
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Route 3: mv_news_flat
app.get("/proxy/list_flat", async (req, res) => {
  const { table = "mv_news_flat", limit = 10 } = req.query;
  const url = `${SUPABASE_URL}/rest/v1/${table}?limit=${limit}`;
  try {
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Route 4: mv_news_daily_asset
app.get("/proxy/list_daily", async (req, res) => {
  const { table = "mv_news_daily_asset", limit = 10 } = req.query;
  const url = `${SUPABASE_URL}/rest/v1/${table}?limit=${limit}`;
  try {
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
