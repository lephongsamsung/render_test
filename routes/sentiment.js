import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// 🔹 Fear & Greed Index
router.get("/sentiment", async (req, res) => {
  try {
    const r = await fetch("https://api.alternative.me/fng/");
    const data = await r.json();
    res.json({ source: "alternative.me", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
