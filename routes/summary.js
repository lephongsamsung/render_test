import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const COINGLASS_KEY = process.env.COINGLASS_API_KEY;
const SUPABASE_URL = "https://czdmkwjbfljmfijaulor.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// 🔹 Tổng hợp dữ liệu
router.get("/summary", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol)
    return res.status(400).json({ error: "symbol required, e.g. BTCUSDT" });

  try {
    const [market, funding, sentiment, news] = await Promise.all([
      fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`),
      fetch(
        `https://open-api.coinglass.com/api/pro/v1/futures/funding_rate?symbol=${symbol}`,
        { headers: { coinglassSecret: COINGLASS_KEY } }
      ),
      fetch("https://api.alternative.me/fng/"),
      fetch(`${SUPABASE_URL}/rest/v1/mv_news_daily_asset?limit=5`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }),
    ]);

    const [m, f, s, n] = await Promise.all([
      market.json(),
      funding.json(),
      sentiment.json(),
      news.json(),
    ]);

    res.json({
      source: "summary",
      symbol,
      data: { market: m, funding: f, sentiment: s, news: n },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
