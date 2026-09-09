const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "City name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    region: {
      type: String,
      default: "Egypt",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
