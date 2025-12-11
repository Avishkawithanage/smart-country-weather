// routes/records.js
const express = require("express");
const router = express.Router();
const apiKeyMiddleware = require("../middleware/apikey");
const authMiddleware = require("../middleware/auth");
const WeatherRecord = require("../models/WeatherRecord");

// POST /submit - require API key + JWT
router.post("/submit", apiKeyMiddleware, authMiddleware, async (req, res) => {
  try {
    const { city, temperature, humidity, wind, timestamp } = req.body;
    if (!city || temperature === undefined || temperature === null) {
      return res.status(400).json({ message: "Missing required fields: city or temperature" });
    }

    const doc = new WeatherRecord({
      city,
      temperature,
      humidity: humidity ?? null,
      wind: wind ?? null,
      timestamp: timestamp ? new Date(timestamp) : undefined,
      userId: req.user ? String(req.user.sub) : null
    });

    await doc.save();
    return res.json({ message: "Data saved to DB!", id: doc._id });
  } catch (err) {
    console.error("Submit error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /records - require API key + JWT, return only user's records
router.get("/records", apiKeyMiddleware, authMiddleware, async (req, res) => {
  try {
    const rows = await WeatherRecord.find({ userId: req.user ? String(req.user.sub) : null })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean()
      .exec();
    return res.json(rows);
  } catch (err) {
    console.error("Records error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
