const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Exploregypt API is running" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cities", require("./routes/citiesRoutes"));
app.use("/api/places", require("./routes/placesRoutes"));
app.use("/api/favorites", require("./routes/favoritesRoutes"));
app.use("/api/questions", require("./routes/questionsRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

module.exports = app;
