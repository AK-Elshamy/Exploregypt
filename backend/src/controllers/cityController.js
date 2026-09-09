const City = require("../models/City");

exports.getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({ success: true, count: cities.length, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ success: false, message: "City not found" });
    }
    res.status(200).json({ success: true, data: city });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCity = async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json({ success: true, data: city });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!city) {
      return res.status(404).json({ success: false, message: "City not found" });
    }
    res.status(200).json({ success: true, data: city });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).json({ success: false, message: "City not found" });
    }
    res.status(200).json({ success: true, message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};