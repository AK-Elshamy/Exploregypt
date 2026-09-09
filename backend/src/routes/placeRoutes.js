const express = require('express');
const router = express.Router();
const {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/placeController');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(getPlaces).post(protect, admin, createPlace);
router.route('/:id').get(getPlace).put(protect, admin, updatePlace).delete(protect, admin, deletePlace);

module.exports = router;
