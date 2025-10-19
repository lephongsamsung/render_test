import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const COINGLASS_KEY = process.env.COINGLASS_API_KEY;

// 🔹 Funding rate (CoinGlass)
router.get("/funding", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol)
    return res.status(400).json({ error: "symbol required, e.g. BTCUSDT" });

  try {
    const r = await fetch(
      `https://open-api.coinglass.com/api/pro/v1/futures/funding_rate?symbol=${symbol}`,
      { headers: { coinglassSecret: COINGLASS_KEY } }
    );
    const data = await r.json();
    res.json({ source: "coinglass", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
