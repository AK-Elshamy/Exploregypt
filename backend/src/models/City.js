const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
