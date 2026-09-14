const City = require("../models/City");
const Place = require("../models/Place");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const [citiesCount, placesCount, usersCount] = await Promise.all([
      City.countDocuments(),
      Place.countDocuments(),
      User.countDocuments(),
    ]);

    res.status(200).json({
      cities: citiesCount,
      places: placesCount,
      users: usersCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard stats",
      error: error.message,
    });
  }
};

const createCity = async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create city",
      error: error.message,
    });
  }
};

const updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update city",
      error: error.message,
    });
  }
};

const deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({
      message: "City deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete city",
      error: error.message,
    });
  }
};

const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create place",
      error: error.message,
    });
  }
};

const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(place);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update place",
      error: error.message,
    });
  }
};

const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json({
      message: "Place deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete place",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  createCity,
  updateCity,
  deleteCity,
  createPlace,
  updatePlace,
  deletePlace,
};