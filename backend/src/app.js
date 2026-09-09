const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const cityRoutes = require("./routes/cityRoutes"); 

connectDB();

const app = express();
app.use(express.json());

app.use("/api/cities", cityRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});