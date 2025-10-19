import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const SUPABASE_URL = "https://czdmkwjbfljmfijaulor.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// 🔹 Lấy tin chi tiết theo ID
router.get("/proxy", async (req, res) => {
  const { table, id } = req.query;
  if (!table || !id)
    return res.status(400).json({ error: "Missing table or id" });

  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`;
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Lấy danh sách tin
router.get("/proxy/list", async (req, res) => {
  const { table = "crypto_news", limit = 10 } = req.query;
  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}?limit=${limit}`;
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 mv_news_flat
router.get("/proxy/list_flat", async (req, res) => {
  const url = `${SUPABASE_URL}/rest/v1/mv_news_flat?limit=10`;
  try {
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 mv_news_daily_asset
router.get("/proxy/list_daily", async (req, res) => {
  const url = `${SUPABASE_URL}/rest/v1/mv_news_daily_asset?limit=10`;
  try {
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
