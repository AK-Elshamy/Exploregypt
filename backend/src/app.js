const express = require("express");
const cors = require("cors");
require("dotenv").config();
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Exploregypt API is running" });
});

module.exports = app;