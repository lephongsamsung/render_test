import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// 🔹 Lấy giá và dữ liệu 24h
router.get("/binance", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol)
    return res.status(400).json({ error: "symbol is required, e.g. BTCUSDT" });

  try {
    const r = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
      { headers: { "User-Agent": "KIT-Agent/1.0" } }
    );
    const data = await r.json();
    res.json({ source: "binance", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
