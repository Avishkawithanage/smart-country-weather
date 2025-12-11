// models/Weather.js
const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String },
  admin1: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timezone: { type: String },
  temperature: { type: Number },
  humidity: { type: Number },
  wind: { type: Number },
  weathercode: { type: Number },
  timestamp: { type: String, default: () => new Date().toISOString() },
  userId: { type: String } // optional: filled from JWT sub claim
}, { timestamps: true });

module.exports = mongoose.model('Weather', WeatherSchema);
