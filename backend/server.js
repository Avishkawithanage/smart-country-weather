// ========================================
//  GreenSky Backend - Full Server.js
// ========================================

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Weather = require('./models/Weather'); // <-- make sure models/Weather.js exists

const app = express();

// ---------------------------
// Middleware
// ---------------------------
app.use(cors());
app.use(express.json());

// ---------------------------
// Environment variables
// ---------------------------
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;
const API_KEY = process.env.API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const AUTH_USERNAME = process.env.AUTH_USERNAME || "avii";        // Login username
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "password123";  // Login password

// ---------------------------
// Connect to MongoDB
// ---------------------------
mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => {
  console.error("MongoDB Error:", err);
  process.exit(1);
});

// ---------------------------
// API Key Middleware
// ---------------------------
function checkApiKey(req, res, next) {
  const key = req.headers["x-api-key"];
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: "Invalid API key" });
  }
  next();
}

// ---------------------------
// JWT Middleware
// ---------------------------
function verifyJwt(req, res, next) {
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ---------------------------
// LOGIN Route (real auth)
// ---------------------------
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Username or password missing" });
    }

    if (username !== AUTH_USERNAME || password !== AUTH_PASSWORD) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = { sub: username, name: username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

    res.json({
      message: "Login successful",
      token,
      apiKey: API_KEY
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// DEV TOKEN Route (optional)
// ---------------------------
app.post("/dev-token", (req, res) => {
  const body = req.body || { sub: "dev-user" };
  const token = jwt.sign(body, JWT_SECRET, { expiresIn: "30d" });
  res.json({ token });
});

// ---------------------------
// POST /submit (save weather)
// ---------------------------
app.post("/submit", checkApiKey, verifyJwt, async (req, res) => {
  try {
    const data = req.body || {};

    if (!data.city || data.latitude === undefined || data.longitude === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    data.userId = req.user.sub; // attach user ID from JWT

    const saved = await Weather.create(data);
    res.json({ message: "Saved successfully", saved });

  } catch (err) {
    console.error("POST /submit error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// GET /records (fetch saved data)
// ---------------------------
app.get("/records", checkApiKey, verifyJwt, async (req, res) => {
  try {
    const userId = req.user.sub;
    const records = await Weather.find({ userId }).sort({ createdAt: -1 });

    res.json({ count: records.length, records });

  } catch (err) {
    console.error("GET /records error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// Start Server
// ---------------------------
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
