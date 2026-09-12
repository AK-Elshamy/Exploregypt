const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const favoriteRoutes = require("./routes/favoriteRoutes");
const placeRoutes = require("./routes/placeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/favorites", favoriteRoutes);
app.use("/api/places", placeRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Exploregypt API is running" });
});

module.exports = app;