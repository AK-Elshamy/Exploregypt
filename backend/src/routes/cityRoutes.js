const express = require("express");
const router = express.Router();

const {
  getCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/cityController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

router.route("/")
  .get(getCities)
  .post(protect, isAdmin, createCity);

router.route("/:id")
  .get(getCityById)
  .put(protect, isAdmin, updateCity)
  .delete(protect, isAdmin, deleteCity);

module.exports = router;