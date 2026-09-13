const Place = require('../models/Place');
const City = require('../models/City');

// @desc    Get all places (with search & filter)
// @route   GET /api/places
// @access  Public
exports.getPlaces = async (req, res, next) => {
  try {
    const { search, city, category, sort, page = 1, limit = 12 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (city) {
      // Support city name or id
      const cityDoc = await City.findOne({
        $or: [{ name: { $regex: new RegExp(`^${city}$`, 'i') } }, { _id: city }],
      });
      if (cityDoc) {
        query.city = cityDoc._id;
      } else if (city.match(/^[0-9a-fA-F]{24}$/)) {
        query.city = city;
      }
    }

    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    let sortOption = { rating: -1, name: 1 };

    if (sort === 'name-asc') {
      sortOption = { name: 1 };
    } else if (sort === 'name-desc') {
      sortOption = { name: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const places = await Place.find(query)
      .populate('city', 'name region')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Place.countDocuments(query);

    res.json({
      success: true,
      count: places.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single place
// @route   GET /api/places/:id
// @access  Public
exports.getPlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id).populate('city', 'name region description');
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }
    res.json({ success: true, data: place });
  } catch (error) {
    next(error);
  }
};

// @desc    Create place
// @route   POST /api/places
// @access  Private/Admin
exports.createPlace = async (req, res, next) => {
  try {
    const place = await Place.create(req.body);
    const populated = await Place.findById(place._id).populate('city', 'name region');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
};

// @desc    Update place
// @route   PUT /api/places/:id
// @access  Private/Admin
exports.updatePlace = async (req, res, next) => {
  try {
    let place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }
    place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('city', 'name region');
    res.json({ success: true, data: place });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete place
// @route   DELETE /api/places/:id
// @access  Private/Admin
exports.deletePlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }
    await place.deleteOne();
    res.json({ success: true, message: 'Place deleted' });
  } catch (error) {
    next(error);
  }
};
