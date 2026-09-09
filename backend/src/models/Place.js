const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Place name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true,
    },
    category: {
      type: String,
      enum: ['Historical', 'Museum', 'Beach', 'Nature', 'Religious', 'Entertainment', 'Shopping', 'Other'],
      default: 'Other',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800',
    },
    location: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5,
    },
    openingHours: {
      type: String,
      default: 'Daily 9:00 AM - 5:00 PM',
    },
    ticketPrice: {
      type: String,
      default: 'Free / Varies',
    },
  },
  { timestamps: true }
);

placeSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Place', placeSchema);
