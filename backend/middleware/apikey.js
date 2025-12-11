// middleware/apikey.js
const apiKey = process.env.API_KEY;

module.exports = (req, res, next) => {
  const key = req.header("x-api-key");
  if (!apiKey) {
    console.warn("Warning: API_KEY not set in .env — skipping API key check");
    return next();
  }
  if (!key || key !== apiKey) {
    return res.status(401).json({ message: "Invalid or missing API key" });
  }
  next();
};
