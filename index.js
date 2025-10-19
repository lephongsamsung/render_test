import express from "express";
import cors from "cors";

// Import route modules
import supabaseRoutes from "./routes/supabase.js";
import binanceRoutes from "./routes/binance.js";
import sentimentRoutes from "./routes/sentiment.js";
import fundingRoutes from "./routes/funding.js";
import summaryRoutes from "./routes/summary.js";

const app = express();
app.use(cors());

// Mount routes
app.use("/", supabaseRoutes);
app.use("/", binanceRoutes);
app.use("/", sentimentRoutes);
app.use("/", fundingRoutes);
app.use("/", summaryRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ Crypto Proxy Server is running" });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log("✅ Route:", r.route.path);
  }
});
