const Favorite = require("../models/Favorite");

// Add place to favorites
const addFavorite = async (req, res) => {
  try {
    const { placeId } = req.body;
    const userId = req.user.id;

    if (!placeId) {
      return res.status(400).json({
        message: "placeId is required",
      });
    }

    const existingFavorite = await Favorite.findOne({
      userId,
      placeId,
    });

    if (existingFavorite) {
      return res.status(409).json({
        message: "Place is already in favorites",
      });
    }

    const favorite = await Favorite.create({
      userId,
      placeId,
    });

    res.status(201).json({
      message: "Place added to favorites",
      favorite,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add favorite",
      error: error.message,
    });
  }
};

// Get user's favorites
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ userId })
      .populate("placeId")
      .sort({ createdAt: -1 });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get favorites",
      error: error.message,
    });
  }
};

// Remove place from favorites
const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { placeId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      userId,
      placeId,
    });

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      message: "Place removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove favorite",
      error: error.message,
    });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};