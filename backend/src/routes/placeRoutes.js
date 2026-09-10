const express = require("express");
const router = express.Router();

const {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placeController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getPlaces)
  .post(protect, isAdmin, createPlace);

router
  .route("/:id")
  .get(getPlace)
  .put(protect, isAdmin, updatePlace)
  .delete(protect, isAdmin, deletePlace);

module.exports = router;
