const express = require("express");
const router = express.Router();
const {getCities, getCityById, createCity, updateCity, deleteCity} = require("../controllers/cityController");

router.route("/")
  .get(getCities)
  .post(createCity);

router.route("/:id")
  .get(getCityById)
  .put(updateCity)
  .delete(deleteCity);

module.exports = router;