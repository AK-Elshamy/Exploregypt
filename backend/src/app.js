const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Exploregypt API is running",
    status: "ok",
  });
});

// Core routes currently available in the repository.
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cities", require("./routes/cityRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// These routes will be mounted when their team branches are merged.
// Favorites and Questions are intentionally not required here until
// their route/controller implementations exist in the repository.

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Something went wrong",
  });
});

module.exports = app;
