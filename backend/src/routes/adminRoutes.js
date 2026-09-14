const express = require("express");
const router = express.Router();

const { protect, isAdmin } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  createCity,
  updateCity,
  deleteCity,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/adminController");

router.use(protect, isAdmin);

router.get("/dashboard", getDashboardStats);

router.post("/cities", createCity);
router.put("/cities/:id", updateCity);
router.delete("/cities/:id", deleteCity);

router.post("/places", createPlace);
router.put("/places/:id", updatePlace);
router.delete("/places/:id", deletePlace);

module.exports = router;